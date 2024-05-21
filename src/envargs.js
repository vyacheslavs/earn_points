const envVars = {
    secret : process.env.REACT_APP_BONUS_REWARD_SECRET || "",
    server : process.env.REACT_APP_BACKEND || "http://localhost:3001"
};

export default envVars;
