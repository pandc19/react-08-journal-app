import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dl99gxazt',
    api_key: '783728956149512',
    api_secret: 'CURFgJrk5StKYU3Y2eMiuTdrlOQ',
    secure: true,
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://media.istockphoto.com/id/146060999/es/foto/campo-de-costa-rica.jpg?s=612x612&w=0&k=20&c=_bY7rbYl2xdMBUJEaVvZOiBzJAozzgIm02baQjpTXl4=';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
        console.log(cloudResponse);


    });

    test('debe de retornar null', async () => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);

    });
});