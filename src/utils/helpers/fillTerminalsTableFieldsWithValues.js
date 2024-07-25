export const fillTerminalsTableFieldsWithValues = (terminals = [], mccs = [], posModels = [], cities = [], paySystems = []) => {
    terminals.map((terminal) => {
        mccs.map((mcc) => {
            if (mcc.id === terminal.mcc_id) {
                terminal.mcc_id = mcc.code;
            }
        });

        posModels.map((posModel) => {
            if (posModel.id === terminal.posModel_id) {
                terminal.posModel_id = posModel.name;
            }
        });

        cities.map((city) => {
            if (city.id === terminal.city_id) {
                terminal.city_id = city.name_am;
            }
        });

        paySystems.map((paySystem) => {
            if (paySystem.id === terminal.paymentSystem_id) {
                terminal.paymentSystem_id = paySystem.name_am;
            }
        });
    });

    return terminals;
};