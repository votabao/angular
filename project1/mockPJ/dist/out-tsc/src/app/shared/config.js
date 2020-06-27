"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var host = 'http://192.168.26.72:8080';
exports.CONFIG = {
    apiURl: host + '/api/group/showNameGroupFollowing',
    courseUrl: host + '/api/courseContent/getAllCourseContent',
    groupUrl: host + '/api/member/memberJoin?groupID=',
    groupsUrl: host + '/api/group/showGroup?courseID=',
    createGroupUrl: host + '/api/group/createGroup?courseID=',
    tokenUrl: host + '/login/getToken',
    googleOauthClientId: '192542435299-0f2j6frtp5kq4ne2iljobhpjhjejesdb',
    membersUrl: host + '/api/member/memberJoin?groupID=',
    memberDetailUrl: host + '/api/member/memberDetail?memberID=',
    userLoggedIn: host + '/api/user/showEmail',
    addUser: host + '/api/member/addMember?groupID=',
    setCaptainUrl: host + '/api/captain-action/set-captain?member_id=',
    removeMemberUrl: host + '/api/captain-action/delete-member?member_id=',
    setMentorUrl: host + '/api/captain-action/set-mentor?member_id=',
    removeMentorUrl: host + '/api/captain-action/remove-mentor?mentor_id=',
    pendingUrl: host + '/api/pendingList/getPendingList?groupID=',
    declinePendingUser: host + '/api/pendingList/declineMember?userID=',
    approvePendingUser: host + '/api/pendingList/approveMember?userID=',
    approvePendingContent: host + '/api/pendingList/approveContent?groupID=',
    declinePendingContent: host + '/api/pendingList/declineContent?groupID=',
    approveMemberUrl: host + 'api/pendingList/declineMember?userID=',
    contentsUrl: host + '/api/classContent/getAllClassContent/?classID=1',
    addContentUrl: host + '/api/classContent/addClassContent?groupID=1',
    editContentUrl: host + '/api/classContent/editClassContent?classID=1&userID=1&contentID=',
    eventUrl: host + '/api/classEvent/showlistevent?groupID=2',
    addEvent: host + '/api/classEvent/addEvent?groupID=1',
    addCourseUrl: host + '/api/course/addCourse/',
    editCourse: host + '/api/courseContent/editCourse?courseID=',
    courseId: host + '/api/courseContent/getCourseForEdit?courseID=',
    dateFormat: 'dd-MM-yyyy',
    maxSizeImg: 1048576
};
//# sourceMappingURL=config.js.map