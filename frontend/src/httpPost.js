import React, { useState, useEffect } from 'react';
import { apihost } from './components/apihost';
// export const useHttp = (params) => {
//     var data =
//     {
//         Payload: params.data,
//     };
//     var url = apihost + params.url
//     return window.fetch(url,
//         {
//             credentials: 'same-origin',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//             },
//             method: 'GET',
//             // body: JSON.stringify(data)
//         }).catch((err) => {
//             if (params.onError != null)
//                 params.onError(err);
//             console.log(err);
//             return { then: params.finally };
//         })
//         .then((response) => {
//             if (!response.ok) {
//                 if (params.onError != null)
//                     params.onError(response);

//                 return { then: params.finally }; // end/break the chain
//             }
//             return response.json();
//         }).then((json) => {
//             return params.onSuccess(json, params.sender);
//         }).then(() => {
//             params.finally();
//         });
// }


export const useHttp = (params) => {
    var url = apihost + params.url;
    
    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (params.onError != null)
                        params.onError(response);

                    return { then: params.finally }; // end/break the chain
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return params.onSuccess(data, params.sender);
            }).then(() => {
                params.finally();
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
    }, []);
}

export const useHttpPost = (params) => {
    var url = apihost + params.url;
    var data = params.data;

    // if(data.ClientName === "" || data.Contact === "" || data.Email === "" || data.Address === ""){
    //     alert('field required value')
    // }

    // useEffect(() => {
        fetch(url,
            {
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    if (params.onError != null)
                        params.onError(response);

                    return { then: params.finally }; // end/break the chain
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log("Data from Save")
                return params.onSuccess(data, params.sender);
            }).then(() => {
                params.finally();
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
    // }, []);
}