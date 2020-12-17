let player.RadiPosao = null;
let player.PosaoCPBroj = null;

class prekiniposao implements ICommand {

    public name: string = "prekiniposao";

    public arg: CommandArgument[] = [];

    public tag: string = "poslovi";

    public fullText: boolean = false;

    public handler(player: PlayerMp, fullText: string, ...args: any): void {

        mp.events.call('prekiniposao', player);
        chat.sendInfoMessage(player, "Uspesno ste prekinuli posao!");
    }
}
 
class otkaz implements ICommand {

    public name: string = "otkaz";

    public arg: CommandArgument[] = [];

    public tag: string = "poslovi";

    public fullText: boolean = false;

    public handler(player: PlayerMp, fullText: string, ...args: any): void {

        const character: Character = get(player, "character");

        mp.events.call('prekiniposao', player);
        character.data.job = 0;
        chat.sendInfoMessage(player, "Uspesno ste dali otkaz, srecno u potrazi novog posla!");
    }
}

export { poslovi_server };