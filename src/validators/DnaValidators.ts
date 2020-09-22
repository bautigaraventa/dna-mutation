import { celebrate, Joi } from 'celebrate';

export class DnaValidator {

    public mutation = celebrate({
        body: Joi.object().keys({
            dna: Joi.array().items(Joi.string().regex(/^[A/T/C/G/a/t/c/g]+$/)).required(),
        }),
    });

    public isValidDNA = () => {
        return function (req, res, next) {
            try {
                if (!req.body.dna?.length) {
                    throw new Error(`Invalid DNA: it can't be empty`);
                }

                const rowLength = req.body.dna[0]?.length;
                req.body.dna.forEach(dna => {
                    if (dna.length !== rowLength) {
                        throw new Error(`Invalid DNA: it must be an NxN structure`);
                    }
                });

                if (rowLength !== req.body.dna.length) {
                    throw new Error(`Invalid DNA: it must be an NxN structure`);
                }

                return next();
            } catch (error) {
                return res.status(500).send({
                    error: error.message,
                });
            }
        }
    }

}

export const dnaValidator = new DnaValidator();