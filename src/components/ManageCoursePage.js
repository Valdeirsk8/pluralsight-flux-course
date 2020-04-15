import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
//import * as courseApi from "../api/courseApi";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [erros, setErros] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses);
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addCangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCoursesBySlug(slug));
      //courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    setCourse({ ...course, [target.name]: target.value });
  }

  function isFormValid() {
    const _erros = {};
    if (!course.title) _erros.title = "Title is required";
    if (!course.authorId) _erros.authorId = "Author is required";
    if (!course.category) _erros.category = "Category is required";

    setErros(_erros);

    return Object.keys(_erros).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={erros}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
