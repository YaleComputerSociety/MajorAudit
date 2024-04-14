import { Dialog } from "@headlessui/react";
import { StudentCourse, Course } from "../../types/TypeCourse";

function CourseModal(props: {studentCourse: StudentCourse[]; course: Course[]; isOpen: any; closeModal: any;}) {
  if (props.studentCourse.length === 0 && props.course.length !== 0) {
    return (
      <Dialog className="Dialog" open={props.isOpen} onClose={props.closeModal}>
        <Dialog.Panel>
          <Dialog.Title>{props.course[0].title}</Dialog.Title>
          <Dialog.Description>{props.course[0].title}</Dialog.Description>

          <p>{props.course[0].description}</p>

          <button onClick={props.closeModal}>Close</button>
        </Dialog.Panel>
      </Dialog>
    );
  } else if (props.studentCourse.length !== 0 && props.course.length === 0) {
    return (
      <Dialog className="Dialog" open={props.isOpen} onClose={props.closeModal}>
        <Dialog.Panel>
          <Dialog.Title>{props.studentCourse[0].course.title}</Dialog.Title>
          <Dialog.Description>{props.studentCourse[0].course.title}</Dialog.Description>

          <p>{props.studentCourse[0].course.description}</p>

          <button onClick={props.closeModal}>Close</button>
        </Dialog.Panel>
      </Dialog>
    );
  }
  return <div></div>
}

export default CourseModal;
