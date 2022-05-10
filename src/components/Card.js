import styles from './card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faGlobe,
  faEnvelope,
  faTrash,
  faPen,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useAppContext } from '../context/AppContext';

export default function Card({ user }) {
  const imgUrl = `https://avatars.dicebear.com/api/avataaars/${user.username}.svg?mood=happy`;
  const { likedItems, like, dislike, deleteUser, editUser } = useAppContext();
  const foundItem = likedItems.find((item) => item === user.id);

  return (
    <div className={styles.card}>
      <img src={imgUrl} className={styles.card__img} alt='' />
      <div className={styles.card__body}>
        <h3 className={styles.card__body__title}>{user.name}</h3>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <div className={styles.left}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className={styles.right}>{user.email}</div>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className={styles.right}>{user.phone}</div>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className={styles.right}>{user.website}</div>
          </div>
        </div>
      </div>
      <div className={styles.card__bottom}>
        {foundItem ? (
          <FontAwesomeIcon
            className={styles.icon}
            icon={solidHeart}
            color='#FF5733'
            onClick={() => dislike(user.id)}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.icon}
            icon={faHeart}
            color='#FF5733'
            onClick={() => like(user.id)}
          />
        )}
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPen}
          onClick={() => editUser(user)}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrash}
          onClick={() => deleteUser(user.id)}
        />
      </div>
    </div>
  );
}
