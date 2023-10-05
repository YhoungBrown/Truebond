{/**const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUsers = {...users};
    delete newUsers[userLoggedIn];

    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user};
}




export default getMatchedUserInfo*/}

const getMatchedUserInfo = (users, userLoggedIn) => {
    const matchedUser = Object.entries(users).find(([id]) => id !== userLoggedIn);
  
    if (matchedUser) {
      const [id, user] = matchedUser;
      return { id, ...user };
    }
  
    return null; // Return null if no matched user is found
  };
  
  export default getMatchedUserInfo;
  