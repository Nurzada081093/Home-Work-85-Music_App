import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import React from 'react';
import { ITrack } from '../../types';
import Box from '@mui/material/Box';

interface Props {
  openModal: boolean;
  closeModal: () => void;
  track: ITrack;
}

const ModalWindow: React.FC<Props> = ({openModal = false, closeModal, track}) => {
  const videoId = track.url.split('v=')[1];

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={closeModal}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: '500px', height: '300px', borderRadius: 'md', boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" />
          <Box sx={{ position: 'relative'}}>
            <iframe
              style={{
                border: 'none',
                borderRadius: '5px',
                width: '100%',
                height: '298px'
              }}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube video"
            />
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWindow;