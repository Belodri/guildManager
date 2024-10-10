/*
    CONCEPT - Lean more into the "Manager" side of things
    a) Take on contracts to ship goods from one place to another
    b) Employ mercenaries to protect the shipment
    c) Roll for success/failure
    d) profit

    a) Contracts
    Have the following attributes:
    - Size of shipment (small/medium/large): Bigger shipments = higher pay but higher risk
    - Value of shipment (low/medium/high): Higher value = higher pay but higher risk
    - Level of secrecy (low/medium/high): Higher secrecy = higher pay but higher risk
    - Source & Destination (name of location, plane): may limit the choice of mercenaries (no demon allowed in heaven for example)
    - Pay: How much the contract pays if completed successfully
    - Flavour: What is being shipped, from where to where?

    b) Mercenaries
    Have the following attributes:
    - Name
    - Origin (plane of existance)
    - Price (in gp, for a single mission, always paid upfront)
    - Skills: 
        - Stealth 
        - Combat ()
        - Diplomacy ()
        - loyalty: "Not all hired mercenaries are equally trustworthy or skilled. Hiring cheap or unvetted protection could increase the risk of desertion, incompetence, or betrayal during a high-stakes contract.
        - Veteran

    BRAINSTORMING
        What to roll:
        - How covert is the mission? The more people know about it, the better they can disrupt it.
            Factors:
            - Size: Bigger shipments are harder to hide
            - Number of Mercenaries: The more mercenaries are involved, the harder it is to keep a secret.
        
        - 

    Mission stats:
    - Risk (number): represents the DC for all mission related rolls
    - Pay (number): How much the contract pays if completed successfully

    Risk factors:
    - Shipment Size: Larger shipments carry a higher risk
    - Shipment Value: Higher value shipments carry a higher risk
    - Time Sensitivity: Time-sensitive shipments carry a higher risk
    - Legality: Shipments of goods that are illegal carry a higher risk. Double so if the goods are illegal in both origin and destination.

    Shipment
    - Size: How big is the shipment physically?                                                 - no roll: Just number of mercenaries needed.
    - Speed: How quickly does the shipment need to be delivered?                                - roll: average adventurer Speed
    - Value: How valuable are the shipped wares?                                                - roll: average adventurer loyalty
    - Legality: Are the shipped goods illegal in origin plane or destination plane?             - roll: average adventurer Stealth

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Contracts and Adventurers are refreshed every time the party gets to a new town (or once per month if they stay in one place for longer).
    always 5 contracts and 10 adventurers

    Contract:
        - Time DC:      How quickly does the shipment need to be delivered?
        - Stealth DC:   How important is it for the shipment to be delivered in a covert manner?
        - Value DC:     How valuable are the shipped wares?
        - Danger DC:    How dangerous is the route as a whole?
        - Reward:       How much does the contract pay once it's successfully completed?
    FLAVOUR
        - Origin
        - Destination
        - Goods

    Adventurer:
        - Skills:
            - Speed:        How fast is this adventurer?
            - Stealth:      How well is this adventurer able to work in a covert manner?
            - Loyalty:      How reliable and trustworthy is this adventurer?
            - Competency:   How competent is this adventurer?
        - Price:            How much does this adventurer charge for a single mission (paid upfront)?
        FLAVOUR
        - Name
        - Race
        - other npc stuff (description, age, etc...)
        - Class

    Checks (1d20 + average adventurer stat vs mission stat DC):
        - Speed: speed vs mission time DC
        - Stealth: stealth vs mission stealth DC
        - Loyalty: loyalty vs mission value DC
        - Danger: competency against mission danger DC

    Each failed check lowers the contract's reward by 25%:
        - failed Speed check:       Shipment delivered late
        - failed Stealth check:     Shipment not kept as secret as client wished
        - failed Loyalty check:     Parts of shipment stolen by the adventurers
        - failed Danger check:      Parts of shipment stolen or damaged by various dangers along the way 



    Tiers:
    4) DC = 11-15
    3) DC = 16-20
    2) DC = 21-25
    1) DC = 26-30


    Contract Calc
        DCs: 1d20 + 10 (11-30) each
        Reward/tier for each DC (baseline):
            4: 
            3: 20000
            2: 40000
            1: 80000

    Success chances:

    
    Adventurer Calc
        sum of skills + random variable = price
        single skill = 10+1d10

    
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    static WARETYPES = ["weapons", "armour", "cloth", "food", "livestock", "slaves", "gemstones", "metal", "tools", "treasure"];

*/

/* BRAINSTORMING

    - Always 20 Adventurers available to assign
        - Adventurers can be kicked out of the guild or die, which removes them from the pool.
        - When one is kicked out or dies, it's replaced by a new one.
        - Only x can be kicked out every week (to represent not being able to fill empty positions just like that; prevents infinitely rerolling adventurers)
        - They die when rolling a nat 1 on a mission.

    - Max 7 missions at any time.
        - Each week(?) new missions become available. (check date, keep track of last refresh)
        - 


*/

/* LEGEND (player facing info)
    Adventurer & mission stats: 
    - Brawn: Physical prowess, combat ability, and endurance.
    - Cunning: Stealth, subterfuge, strategy, and knowledge.
    - Spellcraft: Magical affinity, knowledge and powers.
    - Influence: Social skills, manipulation, charisma, and leadership.
    - Reliability: Reliability gauges how consistently the adventurer can be counted on to complete tasks and follow through without undermining the guild or mission.

    Other adventurer stats:
    - Name
    - # of survived missions

    Other mission stats:
    - Description
*/

/*  WORKFLOW

    The adventurer's guild consists of two parts:
    - Adventurers
    - Missions

    Mission
        When first opening a mission, the user has to first roll the mission's DCs. Once the DCs are rolled, the payout of the mission is calculated as well. (flavour as "opening the sealed scroll containing the mission instructions")

    
    The user can then assign adventurers to this mission. At least one adventurer is needed per mission, though up to 4 can be assigned to one mission.
    Each adventurer will automatically fill the mission's DC which they are the best at from among the assigned adventurers. An adventurer can take care of multiple mission checks!
        - Also show potential profit here (mission reward - adventurer cost). This value assumes all mission checks are passed successfully.
        - A special mission check, which has to be successfully completed by each adventurer is the loyalty check.
    
    Once at least one adventurer is assigned to a mission, the mission can be started.
    The user then has to roll 4 different mission checks, the result of each is printed into chat for all to see.
        - Include adventurer name and failure reason in the roll like: "Gavin Dustwillow has failed a DC 25 Cunning check."     //take care of flavour later
    Each failed check reduces the mission's payout by 25%.

    In addition to that, the user has to roll one loyalty check for each adventurer on that mission. Each failed loyalty check reduces the mission's payout by 10%.
    The total payout cannot go below 0.

    Once all checks have been rolled, the adventurer's guild receives an amount of gold pieces equal to the mission's payout - the sum of the adventurers' individual prices. The adventurers are to be paid regardless of the mission's success.
    This can bring the adventurer's guild into a negative balance which has to be refilled by the players before more missions can be sent out.
*/

/* CODE NOTES

    How/where to store persistent data?
    - Should be shared across all players.
    - 
*/


class AdventurersGuild {
    /*----------------------------------------------------------------------------
                    Static Methods            
    ----------------------------------------------------------------------------*/

    /*----------------------------------------------------------------------------
                    Instanced Methods            
    ----------------------------------------------------------------------------*/
    constructor() {
        recruitedAdventurers = new Set();
        availableMissions = new Set();
        treasury = 0;
    }

    rerollMissions(config = {}) {
        const {
            numberOfMissions = 3
        } = config;

        availableMissions.clear();
        for(let i = 0; i < numberOfMissions; i++) {
            
        }
    }
    


}



class Mission {
    /*----------------------------------------------------------------------------
                    Static Methods            
    ----------------------------------------------------------------------------*/
    /**
         * Rolls and calculates a single attribute
         * @param {object} rewardConfig 
         * @param {number} [rewardConfig.baseNum=2000]              The base number for the reward calculation.
         * @param {number} [rewardConfig.exponent=3]                The exponential growth factor.
         * @param {number} [rewardConfig.randomFactorRange=0.1]     The range for random fluctuation (between 0 and the range).
         * @returns {Promise<object>}                               An object containing roll, DC, tier, and reward.
         */
    static async rollAttribute(rewardConfig = {}) {
        const roll = await new Roll("1d20").evaluate();
        const DC = 10 + roll.total;
        const tier = Math.ceil((roll.total + 1) / 5);   //split into 4 tiers

        const reward = (() => {
            // Destructure rewardConfig and provide defaults for missing properties
            const {
                baseNum = 2000,
                exponent = 3,
                randomFactorRange = 0.1   //0.1 = can fluctuate +/- 10%
            } = rewardConfig;

            const temp = baseNum * Math.pow(exponent, tier - 1);
            const randomFactor = Math.round((Math.random() * 2 * randomFactorRange - randomFactorRange) * 100) / 100;
            return temp * (1 + randomFactor);
        })();

        return {
            roll: roll,
            DC: DC,
            tier: tier,
            reward: reward,
        }
    }
    /*----------------------------------------------------------------------------
                    Instanced Methods            
    ----------------------------------------------------------------------------*/
    constructor() {
        this.id = `mission.${foundry.utils.randomID}`;

        this.attributes = {
            brawn: {},
            cunning: {},
            spellcraft: {},
            influence: {},
            loyalty: {},
        };

        //init flavour properties
        /*
            - Type of wares
            - Origin
            - Destination
            - Flavour Text
        */
    }

    /** Just a showcase of how to set the attributes, don't use this method like this! */
    async __temp__setAllAttributesButton() {
        for(let key of Object.keys(this.attributes)) {
            this.attributes[key] = await this.rollAttribute();
        }
    }
}


class Adventurer{
    /*----------------------------------------------------------------------------
                    Static Methods            
    ----------------------------------------------------------------------------*/
    /**
         * Rolls and calculates a single attribute
         * @param {object} priceConfig 
         * @param {number} [priceConfig.baseNum=100]                The base number for the price calculation.
         * @param {number} [priceConfig.exponent=1.274]             The exponential growth factor.
         * @param {number} [priceConfig.randomFactorRange=0.1]      The range for random fluctuation (between 0 and the range).
         * @returns {Promise<object>}                               An object containing roll, total, and price.
         */
    static async rollAttribute() {
        const roll = await new Roll("1d20").evaluate();
        const price = (() => {
            const {
                baseNum = 100,
                exponent = 1.274,
                randomFactorRange = 0.1   //0.1 = can fluctuate +/- 10%
            } = priceConfig;

            const temp = baseNum * Math.pow(exponent, value - 1);
            const tempRounded = Math.round(temp / 10) * 10;   //round to a multiple of 10
            const randomFactor = Math.round((Math.random() * 2 * randomFactorRange - randomFactorRange) * 100) / 100;
            return tempRounded * (1 + randomFactor);
        })();

        return {
            roll: roll,
            total: roll.total,
            price: price
        }
    }

    /*----------------------------------------------------------------------------
                    Instance Methods            
    ----------------------------------------------------------------------------*/
    constructor() {
        this.id = `adventurer.${foundry.utils.randomID}`;

        this.attributes = {
            brawn: {},
            cunning: {},
            spellcraft: {},
            influence: {},
            loyalty: {},
        };
        this.price = 0;

        //init flavour properties
        /*
            - name
            - description
            - class
        */
    }
}