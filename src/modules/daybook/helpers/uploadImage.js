import axios from "axios";

const uploadImage = async ( file ) => {

    if (!file) return

    try {
        
        const formData = new FormData()
        formData.append('upload_preset','curso-vue')
        formData.append('file',file)

        //TODO: Validar por que cors da error al subir la imagen desde este cliente en cloudinaly.
        const url = 'https://res.cloudinary.com/dk0g516sn/image/upload'
        const {data} = await axios({
                                method: "post",
                                url: url,
                                data: formData,
                                headers:{"Content-Type": "multipart/form-data"},
        })

        return data.secure_url

    } catch (error) {
        console.error('Ha acurrido un error al cargar la imagen')
        console.log(error)
        return null
    }

}

export default uploadImage