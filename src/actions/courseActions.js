import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionsType from "./actionsTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    // Hey dispatcher, go tell all stores that a course was just created.
    dispatcher.dispatch({
      actionType: course.id
        ? actionsType.UPDATE_COURSE
        : actionsType.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionsType.LOAD_COURSES,
      courses: courses,
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionsType.DELETE_COURSE,
      id: id,
    });
  });
}
