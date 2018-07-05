'use strict'

const Env = use('Env')
const axios = require('axios');

class YouTubeController {
    async getChannels({ response, request }) {
        const data = request.only(['user']);
        // https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20

        const url = `https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics%2CcontentDetails%2CtopicDetails&forUsername=${data.user}&key=${Env.get('YOUTUBE_API_KEY')}`;
        try {
            const td = await axios.get(url);
            if (td.data.items.length > 0) {
                const channel_id = td.data.items[0].id
                const url2 = `https://www.googleapis.com/youtube/v3/search?key=${Env.get('YOUTUBE_API_KEY')}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=20&type=video`;
                const td2 = await axios.get(url2);
                response.json({ success: true, channel_info: td.data, video_info: td2.data });
            } else {
                response.json({ success: false });
            }  
        } catch (err) {
            response.json({ success: false });
        }    
    }
    async  async getChannelsById({response,request})
    {
        const data = request.only(['channel']);
        const url = `www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics%2CcontentDetails%2CtopicDetails&forUsername=${data.channel}&key=${Env.get('YOUTUBE_API_KEY')}`
        try {
            const td = await axios.get(url);
            if (td.data.items.length > 0) {
                const channel_id = td.data.items[0].id
                const url2 = `https://www.googleapis.com/youtube/v3/search?key=${Env.get('YOUTUBE_API_KEY')}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=20&type=video`;
                const td2 = await axios.get(url2);
                response.json({ success: true, channel_info: td.data, video_info: td2.data });
            } else {
                response.json({ success: false });
            }  
        } catch (err) {
            response.json({ success: false });
        }    
    }

}
module.exports = YouTubeController
