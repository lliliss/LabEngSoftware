export async function parseBody(req){
    return new Promise((resolve, reject) => {
        let data = ''
        req.on('data', chunk => (data += chunk))
        req.on('end', () => {
            try{
                resolve(JSON.parse(data))
            } catch (err) {
                reject(err)
            }
        })
    })
}