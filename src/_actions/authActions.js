import * as type from '../_constants/ActionTypes'
import axios from 'axios'
export const authActions = {
    customerDetails(user, cookie){
        console.log(cookie);
        if(user.id){
            return {
                type: type.IS_AUTHENTICATED,
                user,
                cookie
            }
        }
    },

    fetchCustomerDetails(id, cookie){
        return dispatch => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://localhost/mama-ankara/wp-json/wc/v2/customers/${id}`,
                "method": "GET",
                "headers": {
                    "authorization": "Basic Y2tfODg5OWUyZjY2NTg3YTExZDZiMWIwNjQxODlmNmU0MTI3NmY1NTM4YTpjc18wYjcwOGY1YWY2YjZiNzRhMjc4MGY1M2FiNDliMTlmNTI2ZTI0ZjJi",
                }
            };
            axios(settings).then((response) => {

                dispatch(this.customerDetails(response.data, cookie))
            }).catch((error) => {
                console.log(error);
            });
        }
    },

    loginUser(mail, thepassword){
        return dispatch => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://localhost/mama-ankara/api/user/generate_auth_cookie/?email=${mail}&password=${thepassword}&seconds=150`,
                "method": "GET",
            };
            axios(settings).then((response) => {
                //console.log(response.data.cookie)
                dispatch(this.fetchCustomerDetails(response.data.user.id, response.data.cookie))
            }).catch((error) => {
                console.log(error);
            });
        }
    },

    registerUser(mail, username, Address, thepassword ){
        return dispatch  => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://localhost/mama-ankara/api/user/register/?insecure=cool&username=${username}&email=${mail}&nonce=fee4b8cff2&display_name=${username}&user_pass=${thepassword}`,
                "method": "GET",
                "headers": {
                    "authorization": "Basic Y2tfODg5OWUyZjY2NTg3YTExZDZiMWIwNjQxODlmNmU0MTI3NmY1NTM4YTpjc18wYjcwOGY1YWY2YjZiNzRhMjc4MGY1M2FiNDliMTlmNTI2ZTI0ZjJi",
                }
            };
            axios(settings).then((response) => {
                if(response.data.ok){
                    dispatch(this.loginUser(mail, thepassword))
                }
            }).catch((error) => {
                console.log("ERROR");
            });
        }
    },

    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },

    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    },



    logoOut(id){
        return {
            type: type.IS_LOGGED_OUT,
            id
        }
    },



};