import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalPortalProps = {
  children: React.ReactNode;
};

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    let existingModalRoot = document.getElementById('modal-root');
    if (!existingModalRoot) {
      existingModalRoot = document.createElement('div');
      existingModalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(existingModalRoot);
    }
    setModalRoot(existingModalRoot);

    return () => {
      if (existingModalRoot && !document.getElementById('modal-root')) {
        document.body.removeChild(existingModalRoot);
      }
    };
  }, []);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;
