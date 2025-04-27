
// add/ModalManager.tsx

import React from 'react';
import { useModal } from './context/ModalContext';
import AddCourseModal from './modals/add-modal/AddModal';
import CreateCourseModal from './modals/create-modal/CreateModal';
import UploadCoursesModal from './modals/upload-modal/UploadModal';

const ModalManager: React.FC = () => {
  const { activeModal } = useModal();

  return (
    <>
      {activeModal === 'addCourse' && <AddCourseModal />}
      {activeModal === 'uploadCourses' && <UploadCoursesModal />}
      {activeModal === 'createCourse' && <CreateCourseModal />}
    </>
  );
};

export default ModalManager;