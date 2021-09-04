// @flow strict

export class InvalidCastError extends Error {
  /*:: subjectDescription: string*/
  /*:: targetDescription: string*/
  /*:: causeDescription: ?string*/

  constructor(subjectDescription/*: string*/, targetDescription/*: string*/, causeDescription/*: ?string*/ = null) {
    super(`${subjectDescription} is not ${targetDescription}${causeDescription ? ` because ${causeDescription}` : ''}`);
    this.subjectDescription = subjectDescription;
    this.targetDescription = targetDescription;
    this.causeDescription = causeDescription;
  }
}