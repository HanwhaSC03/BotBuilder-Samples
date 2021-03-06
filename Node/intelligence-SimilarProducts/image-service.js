// The exported functions in this module makes a call to Bing Image Search API returns similar products description if found.
// Note: you can do more functionalities like recognizing entities. For more info checkout the API reference:
// https://msdn.microsoft.com/en-us/library/dn760791.aspx
var request = require('request').defaults({ encoding: null });

var BING_SEARCH_API_ENDPOINT = 'https://api.cognitive.microsoft.com/bing/v7.0/images/details?modules=SimilarProducts&mkt=en-us'
var BING_SEARCH_API_KEY = process.env.BING_SEARCH_API_KEY;

/**
 *  Gets the similar products of the image from an image stream
 * @param {stream} stream The stream to an image.
 * @return {Promise} Promise with visuallySimilarProducts array if succeeded, error otherwise
 */
exports.getSimilarProductsFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: BING_SEARCH_API_ENDPOINT,
                json: true,
                formData: {
                    file: stream
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': BING_SEARCH_API_KEY,
                    'Content-Type': 'multipart/form-data',
                }
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve((body.visuallySimilarProducts && body.visuallySimilarProducts.value) || []);
                }
            });
        }
    );
};

/**
 * Gets the similar products of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with visuallySimilarProducts array if succeeded, error otherwise
 */
exports.getSimilarProductsFromUrl = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: BING_SEARCH_API_ENDPOINT + '&imgurl=' + encodeURIComponent(url),
                headers: {
                    'Ocp-Apim-Subscription-Key': BING_SEARCH_API_KEY
                },
                json: true
            };

            request.get(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve((body.visuallySimilarProducts && body.visuallySimilarProducts.value) || []);
                }
            });
        }
    );
};