import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDiaryProduct } from '../../redux/diet/dietOperations';
import { fetchDiaryProductsByDate } from '../../redux/diet/dietOperations';
import { useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/diet/dietSelectors';
import './DiaryProductsListItem.css';

const DiaryProductsListItem = ({ product }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const handleDelete = async () => {
    try {
      await dispatch(deleteDiaryProduct({ productId: product._id, date: selectedDate })).unwrap();
      const date = new Date(selectedDate);
      await dispatch(fetchDiaryProductsByDate(date));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="diary-products-list-item">
      <div className="diary-product-info">
        <span className="diary-product-name">{product.productName || product.name}</span>
        <span className="diary-product-weight">{product.weight}g</span>
        <span className="diary-product-calories">
          {product.calories ? `${product.calories} kcal` : ''}
        </span>
      </div>
      <button
        type="button"
        className="diary-product-delete"
        onClick={handleDelete}
        aria-label="Delete product"
      >
        ×
      </button>
    </div>
  );
};

export default DiaryProductsListItem;
