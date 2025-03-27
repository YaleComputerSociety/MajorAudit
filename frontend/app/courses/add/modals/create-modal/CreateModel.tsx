
import React from 'react';
import BaseModal from '../base-modal/BaseModal';

// import styles from './CreateCourseModal.module.css';

// interface Module {
//   title: string;
//   description: string;
// }

const CreateCourseModal: React.FC = () => {
  // const [courseData, setCourseData] = useState({
  //   title: '',
  //   description: '',
  // });
  // const [modules, setModules] = useState<Module[]>([{ title: '', description: '' }]);

  // const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setCourseData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleModuleChange = (index: number, field: keyof Module, value: string) => {
  //   const updatedModules = [...modules];
  //   updatedModules[index][field] = value;
  //   setModules(updatedModules);
  // };

  // const addModule = () => {
  //   setModules([...modules, { title: '', description: '' }]);
  // };

  // const removeModule = (index: number) => {
  //   if (modules.length > 1) {
  //     const updatedModules = modules.filter((_, i) => i !== index);
  //     setModules(updatedModules);
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Logic to create course with modules
  //   console.log('Creating course:', { ...courseData, modules });
  //   // You would typically call an API here
  // };

  return (
    <BaseModal title="Create New Course">
			<div>
				
			</div>
      {/* <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleCourseChange}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Course Description</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleCourseChange}
            rows={3}
          />
        </div>
        
        <h4 className={styles.modulesHeading}>Course Modules</h4>
        
        {modules.map((module, index) => (
          <div key={index} className={styles.moduleContainer}>
            <div className={styles.moduleHeader}>
              <h5>Module {index + 1}</h5>
              {modules.length > 1 && (
                <button 
                  type="button" 
                  className={styles.removeButton}
                  onClick={() => removeModule(index)}
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor={`module-title-${index}`}>Module Title</label>
              <input
                type="text"
                id={`module-title-${index}`}
                value={module.title}
                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor={`module-desc-${index}`}>Module Description</label>
              <textarea
                id={`module-desc-${index}`}
                value={module.description}
                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                rows={2}
              />
            </div>
          </div>
        ))}
        
        <button 
          type="button" 
          className={styles.addModuleButton}
          onClick={addModule}
        >
          + Add Module
        </button>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Create Course
          </button>
        </div>
			</form> */}
		</BaseModal>	

	);
}

export default CreateCourseModal;
