const Penalties = require('../entities/Penalties')
const penaltiesRepository = require('../../infrastructure/repositories/penaltiesRepository');
const { addDays } = require('date-fns');

class PenaltiesService{
    constructor(){
        this.penaltiesRepository = penaltiesRepository;
    }

    async addPenalty(member_id){
        let currentDate = new Date();
        let penalty = new Penalties({
            member_id: member_id,
            start_date: currentDate,
            end_date: addDays(currentDate, 3)
        });
        this.penaltiesRepository.setPenalties(penalty);
    }
}

module.exports = PenaltiesService;