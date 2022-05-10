import { useState, useContext, createContext, useEffect } from 'react';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const URL = 'https://jsonplaceholder.typicode.com/users';

export default function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      fetch(URL)
        .then((res) => res.json())
        .then((dta) => {
          setUsers(dta);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isModalOpen]);

  function like(id) {
    setLikedItems((prevState) => [id, ...prevState]);
  }

  function dislike(id) {
    const updated = likedItems.filter((item) => item !== id);
    setLikedItems(updated);
  }

  function editUser(user) {
    setIsModalOpen(true);
    setEditingItem(user);
  }

  function save(id, name, email, phone, website) {
    const updated = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          email,
          phone,
          website,
        };
      } else {
        return user;
      }
    });

    setUsers(updated);
    setIsModalOpen(false);
  }

  function deleteUser(id) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  }

  const value = {
    users,
    loading,
    likedItems,
    like,
    dislike,
    deleteUser,
    isModalOpen,
    setIsModalOpen,
    editUser,
    editingItem,
    save,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
