const envVars = {
    secret : process.env.REACT_APP_BONUS_REWARD_SECRET || "",
    server : process.env.REACT_APP_BACKEND === undefined ? "http://localhost:3001" : process.env.REACT_APP_BACKEND
};

export default envVars;
