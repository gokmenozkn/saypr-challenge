import './App.scss';
import Card from './components/Card';
import LoadingAnimation from './components/LoadingAnimation';
import { useAppContext } from './context/AppContext';
import Modal from './components/Modal';

function App() {
  const { users, loading, isModalOpen } = useAppContext();

  return (
    <div className='App'>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className='container'>
            <div className='row'>
              {users.map((user) => (
                <Card key={user.id} user={user} />
              ))}
            </div>
          </div>
          {isModalOpen && <Modal />}
        </>
      )}
    </div>
  );
}

export default App;
