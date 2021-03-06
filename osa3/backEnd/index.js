const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    }
    return '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/info', (request, response, next) => {
    Person.find({}).then((person) => {
        response.send(`<div>Phonebook has info for ${person.length} people</div>
        <div> ${new Date()}</div>`);
    })
        .catch((error) => next(error));
});


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then((person) => {
        response.json(person.map((personMap) => personMap.toJSON()));
    }).catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then((person) => {
        if (person) {
            response.json(person.toJSON());
        } else {
            response.status(404).end();
        }
    })
        .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post('/api/persons/', (request, response, next) => {
    const person = new Person({
        name: request.body.name,
        number: request.body.number,
    });
    person.save().then((savedPerson) => {
        response.json(savedPerson.toJSON());
    })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: person.number })
        .then((updatedPerson) => {
            response.json(updatedPerson.toJSON());
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } if (error.name !== 'ValidationError') {
        next(error);
    }
    return response.status(400).json({ error: error.message });
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.info(`Server is listening port ${PORT}`);
});
