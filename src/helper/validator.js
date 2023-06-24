class Validator {
  constructor(incomingTask, tasks) {
    this.incomingTask = incomingTask;
    this.tasks = tasks;
  }
  isRevisedTaskValid() {
    if (this.inputValidation()) {
      return {
        status: true,
        message: "course has been updated successfully",
      };
    }
    return {
      status: false,
      message: "course has NOT been updated!",
    };
  }
  isIncomingTaskValid() {
    if (this.inputValidation() && this.hasUniqueTaskId()) {
      return {
        status: true,
        message: "course has been added successfully",
      };
    }
    return {
      status: false,
      message: "course has NOT been added!",
    };
  }
  inputValidation() {
    if (
      this.incomingTask.hasOwnProperty("id") &&
      this.incomingTask.hasOwnProperty("title") &&
      this.incomingTask.hasOwnProperty("description") &&
      this.incomingTask.hasOwnProperty("flag") &&
      (typeof this.incomingTask.id === "number" ||
        this.incomingTask.id.length > 0) &&
      this.incomingTask.title.length > 0 &&
      this.incomingTask.description.length > 0 &&
      typeof this.incomingTask.flag === "boolean"
    ) {
      return true;
    }
    return false;
  }
  hasUniqueTaskId() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == this.incomingTask.id) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Validator;
