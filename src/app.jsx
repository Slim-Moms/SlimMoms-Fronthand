// import { Loader } from 'components/Loader/Loader';
import Modal from "./components/Modal/Modal";
import React from 'react'

const app = () => {
const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Modalı Aç
      </button>





      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Merhaba Dünya"
      >
        <p>Bu bir modal içeriği!</p>
        <button onClick={() => setIsModalOpen(false)}>
          Kapat
        </button>
      </Modal>
    </div>
  )
}

export default app