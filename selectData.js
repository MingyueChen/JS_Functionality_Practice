/**
 * Description
 * 
 * 
 * each session:
 [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];

 * 
 * 
 *  Each session has the following fields:

user: User ID of the session's user.
duration: Duration of the session, in minutes.
equipment: Array of equipment used during the session, in alphabetical order. There are only five different types of equipment.
Implement selectData, a function that returns sessions from the data. It has the interface selectData(sessions [, options]). Available options include:

user: Select only sessions with this id. If not specified, include all users (subject to other filters).
minDuration: Select only sessions with duration equal to or greater than this value. If not specified, include all sessions regardless of duration (subject to other filters).
equipment: Select only sessions where at least one of the specified types of equipment was used. If not specified, include all sessions regardless of equipment used (subject to other filters).
merge: If set to true
Sessions from the same user should be merged into one object. When merging:
Sum up the duration fields.
Combine all the equipment used, de-duplicating the values and sorting alphabetically.
Order merged rows by each user's last position in the input array. For example, the user sequence 8, 7, 1, 7, 7, 2, 2 becomes 8, 1, 7, 2: user 7's last session appears after user 1's session.
The other filter options should be applied to the merged data.
Notes:

When merge is not true, the returned sessions should remain in their original input order.
The input objects should not be modified.
 */

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */
export default function selectData(sessions, options = {}) {
  const { user, minDuration, equipment, merge = false } = options;

  let data;
  if (merge) {
    const mergedMap = new Map();
    sessions.forEach((session, index) => {
      // add a user to a map
      if (!mergedMap.has(session.user)) {
        mergedMap.set(session.user, {
          user: session.user,
          duration: 0,
          equipment: new Set(),
          lastIndex: index,
        });
      } // end if add user to map

      // update the duration and equipment
      const currentUser = mergedMap.get(session.user);
      currentUser.duration += session.duration;
      session.equipment.forEach((item) => {
        currentUser.equipment.add(item);
      });

      // update the lastIndex
      currentUser.lastIndex = index;
    }); // end of forEach

    // sort the mergedMap and convert it to an array
    data = Array.from(mergedMap.values())
      .sort((a, b) => a.lastIndex - b.lastIndex)
      .map(({ lastIndex, ...session }) => ({
        // remove lastIndex
        ...session,
        equipment: [...session.equipment].sort(),
      }));
  } // end of merge
  else {
    data = sessions;
  }

  // deal with other conditions
  return data.filter((session) => {
    // when there is no user in the option, user is undefined
    if (user !== undefined && session.user !== user) return false;
    if (minDuration !== undefined && session.duration < minDuration)
      return false;
    if (
      equipment !== undefined &&
      !equipment.some((item) => session.equipment.includes(item))
    ) {
      return false;
    }

    return true;
  });
}

// testing

const sessions = [
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
  { user: 1, duration: 10, equipment: ["barbell"] },
  { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
  { user: 7, duration: 200, equipment: ["bike"] },
  { user: 2, duration: 200, equipment: ["treadmill"] },
  { user: 2, duration: 200, equipment: ["bike"] },
];

selectData(sessions);
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { user: 2 });
// [
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 200 });
// [
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 400 });
// [];

selectData(sessions, { equipment: ["bike", "dumbbell"] });
// [
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { merge: true });
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];

selectData(sessions, { merge: true, minDuration: 400 });
// [
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
