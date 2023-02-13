//Es reactivo y cuando se cambie el state vamos a notificar a todos los componentes que escuchen los cambios de nuestro estado
export default () => ({
    isLoading:true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Laborum consequat magna sint voluptate incididunt mollit nostrud id occaecat non exercitation labore excepteur.',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'Mollit est aute veniam magna irure dolore ad incididunt culpa velit veniam qui consequat. Ut quis quis duis voluptate quis dolore amet esse ut sunt ea.',
            picture: null
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'Velit excepteur ea irure sint amet ipsum deserunt. Consequat dolore qui cupidatat ullamco qui. Culpa laboris quis aliquip adipisicing ad.',
            picture: null
        }
    ]
}) 