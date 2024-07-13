import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/buttons/Button';

import ModalPortal from './ModalPortal';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  primaryAction: () => void;
  primaryLabel: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  primaryAction,
  primaryLabel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[9999] grid place-items-center overflow-y-auto cursor-pointer bg-slate-900/20 backdrop-blur p-8'
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <div className='relative z-10'>
              <h3 className='text-3xl font-bold text-center my-2 text-slate-800'>
                {title}
              </h3>
              <p className='text-center my-6 text-slate-600'>
                <span className='font-semibold'>{description}</span>
                <br />
                <a href='tel:+639175559033' className='text-slate-700'>
                  Call us at <span className='font-medium'>0917-555-9033</span>
                </a>
                <br />
                <a
                  href='mailto:info@asvbusinesssolution.com'
                  className='text-slate-700'
                >
                  Email us at{' '}
                  <span className='font-medium'>
                    {' '}
                    info@asvbusinesssolution.com
                  </span>
                </a>
              </p>
              <div className='flex justify-center gap-2 '>
                <Button
                  onClick={primaryAction}
                  variant='primary'
                  className='px-4 text-center'
                >
                  {primaryLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ModalPortal>
  );
};

export default Modal;
