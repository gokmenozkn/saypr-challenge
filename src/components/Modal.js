import { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Modal() {
  const { setIsModalOpen, editingItem, save } = useAppContext();
  const [name, setName] = useState(editingItem.name || '');
  const [email, setEmail] = useState(editingItem.email || '');
  const [phone, setPhone] = useState(editingItem.phone || '');
  const [website, setWebsite] = useState(editingItem.website || '');

  let modalRef = useRef();

  function closeModal(e) {
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name && !email && !phone && !website) return;
    save(editingItem.id, name, email, phone, website);
  }

  return (
    <div ref={modalRef} onClick={closeModal} className='modalBackground'>
      <form onSubmit={handleSubmit}>
        <div className='modal'>
          <div className='formGroup'>
            <label>Name:</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='formGroup'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='formGroup'>
            <label>Phone:</label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='formGroup'>
            <label>Website:</label>
            <input
              type='text'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <button className='btn' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
