import axios from "axios";

const mtapi = "https://mt4.mtapi.io";

/**
 * @returns Connection Id
 */
const getConnectionId = async () => {

    try {

        return axios.get(`${mtapi}/Connect?user=44712225&password=tfkp48&host=18.209.126.198&port=443`).then(({ data }) => data).catch((error) => {
            throw (error);
        });

    } catch (error) {

        throw {
            status: 500,
            message: error.message,
            action: "getConnectionId",
            type: "error"
        };
    }
};

/**
 * 
 * @param {*} connectionId 
 * @param {*} tradeData 
 * @returns Slave Account Details
 */
const tradeOnSlaveAccount = async (connectionId, tradeData) => {

    try {

        const { symbol, operation, volume, takeprofit, comment } = tradeData;
        return axios.get(`${mtapi}/OrderSend?id=${connectionId}&symbol=${symbol}&operation=${operation}&volume=${volume}&takeprofit=${takeprofit}&comment=${encodeURI(comment)}`)
            .then(({ data }) => data).catch((error) => {
                throw (error);
            });

    } catch (error) {

        throw {
            status: 500,
            message: error.message,
            action: "tradeOnSlaveAccount",
            type: "error"
        };
    }
};

/**
 * Fetch Trade related data
 */
const getTrade = async () => {

    try {

        const lambdaHitPoint = "https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws";

        const data = await axios.get(lambdaHitPoint).then((response) => {
            return response.data;
        }).catch((error) => {
            throw ({ message: error.message, status: 500, action: "getTrade", type: "error" })
        });

        const connectionId = await getConnectionId();
        const slaveAccountData = await tradeOnSlaveAccount(connectionId, data);

        return {
            status: 200,
            message: 'Ok',
            data: slaveAccountData,
            action: 'getTrade',
            type: 'response'
        };

    } catch (error) {

        console.log('getTrade: error', error);
        return error;
    }
};

export {
    getTrade
};