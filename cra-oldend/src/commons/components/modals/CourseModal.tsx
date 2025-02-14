
import React from "react";
import styles from "./CourseModal.module.css";
import { useModal } from "../../../hooks/modalContext";
import { Dialog } from "@headlessui/react";
import { EMPTYCOURSE } from "../../mock/MockUser";

export default function CourseModal() {
  const { isOpen, setModalOpen } = useModal();

  function closeModal() {
    setModalOpen(EMPTYCOURSE)
  }

  return (
    <>
      <Dialog open={isOpen !== EMPTYCOURSE} onClose={closeModal} style={{ position: "relative", zIndex: "10" }}>
        <div className={styles.modalBackground}/>
        <div style={{ position: "fixed", inset: "0", overflowY: "auto" }}>
          <div className={styles.panelPlacement}>
            <Dialog.Panel className={styles.panelStyle}>
              <Dialog.Title as="h3" className={styles.titleStyle}>
                {isOpen !== undefined ? isOpen.title : 'No title'}
              </Dialog.Title>
              <div style={{ marginTop: "2px" }}>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
