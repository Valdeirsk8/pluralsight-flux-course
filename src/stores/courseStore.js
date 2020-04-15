import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionsTypes from "../actions/actionsTypes";

const CHANGE_ENVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addCangeListener(callback) {
    this.on(CHANGE_ENVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_ENVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_ENVENT);
  }

  getCourses() {
    return _courses;
  }

  getCoursesBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionsTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionsTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionsTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionsTypes.DELETE_COURSE:
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
    // nothing to do
  }
});

export default store;
