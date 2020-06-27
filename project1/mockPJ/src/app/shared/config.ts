const host = 'http://192.168.26.34:8080';

export const CONFIG = {
  followingGroups: host + '/group/show-following-name-groups',

  courseUrl: host + '/course-content/get-all-course-content',
  addCourseUrl: host + '/course/add-course/',
  editCourse: host + '/course-content/edit-course',
  courseId: host + '/course-content/get-course-for-edit',

  groupUrl: host + '/member/memberJoin',

  groupsUrl: host + '/group/show-group',
  createGroupUrl: host + '/group/create-group',
  groupDetail: host + '/group/group-detail',
  editGroup: host + '/edit-group/formdata',
  getStatusUserInGroup: host + '/group/get-status-user-in-group',

  tokenUrl: host + '/login/get-token',
  googleOauthClientId: '192542435299-0f2j6frtp5kq4ne2iljobhpjhjejesdb',
  userLoggedIn: host + '/user/show-email',

  membersUrl: host + '/member/join-member',
  memberDetailUrl: host + '/member/member-detail',

  avatarUrl: '',
  profile: host + '/user/get-profile',
  profileUrl: host + '/user/upload-information',

  addUser: host + '/member/add-member',
  removeMemberUrl: host + '/captain-action/delete-member',

  setCaptainUrl: host + '/captain-action/set-captain',
  setMentorUrl: host + '/captain-action/set-mentor',
  removeMentorUrl: host + '/captain-action/remove-mentor',

  pendingUrl: host + '/pendinglist/get-pendinglist',
  declinePendingUser: host + '/pendinglist/decline-member',
  approvePendingUser: host + '/pendinglist/approve-member',
  approvePendingContent: host + '/pendinglist/approve-content',
  declinePendingContent: host + '/pendinglist/decline-content',
  approveMemberUrl: host + '/pendinglist/decline-member',

  contentsUrl: host + '/content/get-all-approved-contents',
  contentUrlID: host + '/content/get-content-for-edit',
  addContentUrl: host + '/content/add-new-content',
  editContentUrl: host + '/content/edit-content',
  deleteContentUrl: host + '/content/delete-content',

  eventsURL: host + '/event/show-listevent',
  addEvent: host + '/event/add-event',
  eventDetail: host + '/event/show-event',
  putEvent: host + '/event/edit-event',
  deleteEvent: host + '/event/delete-event',

  apiKey: 'txx8t6srsio0w98nqkdl0dziexh5lpcjq2zihbd5k3s2q1tk',
  getRole: host + '/group/get-role-of-user-in-group',

  avatar: host + '/edit-group/get-image-of-group',
  editAvatar: host + '/edit-group/upload-avatar',
  coverImg: host + '/image/get-cover-image-upload',
  editCoverImg: host + '/edit-group/upload-cover-image',

  leaveGroup: host + '/group/leave-group',
  joinGroup: host + '/group/want-to-learn',

  memberAttenContentUrl: host + '/attendance/get-all-member-of-group',
  updateAttenContentUrl: host + '/attendance/update-all-present-member-of-content',
  updateEventAttendanceUrl: host + '/attendance/update-all-present-member-of-event',
  listAttenContentUrl: host + '/attendance/listed-all-present-content',

  getHistoryMemberUrl: host + '/attendance/get-history-all-member-of-content',
  getEventAttendance: host + '/attendance/get-all-member-of-group-with-event',
  addEventContent: host + '/event/add-event-content',
  getEventsAtendance: host + '/attendance/listed-all-present-event',
  getAtendanceEventMemberUrl: host + '/attendance/get-history-all-member-of-event',

  dateFormat: 'dd-MM-yyyy',

  maxSizeImg: 1048576,
};

