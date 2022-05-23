
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, filterBy) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if(filterBy) entities = _filterToys(entities, filterBy)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, 800)
    })
}

function _filterToys(toys, filterBy) {
    console.log(filterBy.txt);
    toys = toys.filter(toy => toy.name.toLowerCase().includes(filterBy.txt.toLowerCase()))
    if (filterBy.label.length) toys = toys.filter(toy => toy.labels.some(label => filterBy.label.indexOf(label.toLowerCase()) >= 0))
    if (filterBy.inStock !== '' && filterBy.inStock !== null) {
        toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }
    return toys
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    // console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}