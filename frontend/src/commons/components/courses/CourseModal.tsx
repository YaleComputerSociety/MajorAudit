import React, { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";

import { useCourseContext } from "../../contexts/CurrentCourseContext";

export default function CourseModal() {
  let [isOpen, setIsOpen] = useState(true);
  const currentCourse = useCourseContext();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>
      <Dialog open={isOpen} onClose={closeModal} style={{ position: "relative", zIndex: "10" }}>
        <div
          style={{
            position: "fixed",
            inset: "0",
            backgroundColor: "rgb(0, 0, 0, 0.25)",
          }}
        />
        <div style={{ position: "fixed", inset: "0", overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              minHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              textAlign: "center",
            }}
          >
            <Dialog.Panel
              style={{
                width: "100%",
                maxWidth: "28rem",
                overflow: "hidden",
                borderRadius: "1rem",
                backgroundColor: "rgb(256, 256, 256)",
                padding: "6px",
                textAlign: "left",
                alignItems: "middle",
                boxShadow:
                  "box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
            >
              <Dialog.Title
                as="h3"
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.5rem",
                  fontWeight: "500",
                  color: "rgb(17, 24, 39)",
                }}
              >
                {currentCourse !== undefined ? currentCourse.title : 'No title'}
              </Dialog.Title>
              <div style={{ marginTop: "2px" }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    color: "rgb(107, 114, 128)",
                  }}
                >
                  {currentCourse !== undefined ? currentCourse.description : 'No description'}
                </p>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
