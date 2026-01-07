import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDiaryProduct, searchProducts } from '../../redux/diet/dietOperations';
import { fetchDiaryProductsByDate } from '../../redux/diet/dietOperations';
import { selectSelectedDate } from '../../redux/diet/dietSelectors';
import './DiaryAddProductForm.css';

const DiaryAddProductForm = ({ onSubmitSuccess, isMobile = false }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (productName.trim().length >= 2) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        const result = await dispatch(searchProducts(productName));
        if (searchProducts.fulfilled.match(result)) {
          setSuggestions(result.payload);
          setShowSuggestions(true);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [productName, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProductSelect = (product) => {
    setProductName(product.title);
    setSelectedProduct(product);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!productName.trim() || !weight.trim()) {
      setError('Please enter product name and grams');
      return;
    }

    const productData = {
      productName: productName.trim(),
      weight: parseFloat(weight),
      date: selectedDate,
    };

    if (selectedProduct && selectedProduct._id) {
      productData.productId = selectedProduct._id;
      productData.calories = selectedProduct.calories;
    }

    try {
      await dispatch(addDiaryProduct(productData)).unwrap();
      const date = new Date(selectedDate);
      await dispatch(fetchDiaryProductsByDate(date));
      setProductName('');
      setWeight('');
      setError('');
      setSelectedProduct(null);
      setSuggestions([]);
      setShowSuggestions(false);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred while adding product';
      setError(errorMessage);
    }
  };

  return (
    <form className="diary-add-product-form" onSubmit={handleSubmit}>
          <div className="diary-form-inputs">
            <div className="diary-form-input-wrapper" style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  setError('');
                  setSelectedProduct(null);
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="diary-form-input"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef} className="diary-suggestions">
                  {suggestions.map((product) => (
                    <div
                      key={product._id}
                      className="diary-suggestion-item"
                      onClick={() => handleProductSelect(product)}
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="diary-grams-wrapper">
              <div className="diary-grams-input-wrapper">
                <input
                  type="number"
                  placeholder="Grams"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setError('');
                  }}
                  className="diary-form-input"
                  min="1"
                  step="1"
                />
              </div>
              <button type="submit" className={isMobile ? "diary-add-button-add" : "diary-add-button-plus"}>
                {isMobile ? "Add" : "+"}
              </button>
            </div>
          </div>
          {error && (
            <div className="diary-error-message">
              {error}
            </div>
          )}
    </form>
  );
};

export default DiaryAddProductForm;
