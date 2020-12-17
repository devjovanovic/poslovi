import { Chat } from "../../../Chat";
import { CommandArgument, ICommand } from "../../../interfaces/ICommand";
import { Character } from "../../character";

mp.labels.new('~b~POSAO: ~w~POSTAR~n~Da uzmete posao kucajte: ~b~/zaposlise', new mp.Vector3(0.000, 0.000, 0.000),
{
  los: false,
  font: 4,
  drawDistance: 11,
  dimension: 0
});

class postar implements ICommand {

    public name: string = "postar";

    public arg: CommandArgument[] = [];

    public tag: string = "poslovi";

    public fullText: boolean = false;

    public handler(player: PlayerMp, fullText: string, ...args: any): void {
        
        const character: Character = get(player, "character");

        if (character.data.job !== 1) {
            Chat.sendErrorMessage(player, "Vi niste zaposleni kao Postar!");
            return;
        }

        if (player.RadiPosao !== false) {
            Chat.sendErrorMessage(player, "Vec radite posao. Morate prvo prekinuti turu /prekiniposao!");
            return;
        }
    
        player.PosaoCPBroj = 0;
        player.RadiPosao = true;

      let ruta = postar_ruta[player.PosaoCPBroj];
      player.call('PostaviPosaoCP', [ruta[0], ruta[1], ruta[2], 4]);
      Chat.sendInfoMessage(player, "Pratite markere da bi ste dostavili postu i zavrsili posao!")
      let dist = player.dist(new mp.Vector3(ruta[0], ruta[1], ruta[2]));
  }
}

mp.events.add('UsaoPosaoCP', (player) => {
  const character: Character = get(player, "character");
  if (character.data.job == 1) {
    if (player.RadiPosao == true) {

      player.call("UnistiPosaoCP");
      player.PosaoCPBroj++;
      if (player.vars.job.jobStage == postar_ruta.length) {
        player.PosaoCPBroj = 0;
        player.RadiPosao = false;
        Chat.sendInfoMessage(player, "Zavrsili ste posao i dobili platu!");
        //MORAS DA MI OBJASNIS OVO NIJE MI JASNO KAKO DA DAM PARE NISAM MOGAO DA NADJEM FUNCKIJU
        
      }
      let ruta = postar_ruta[player.PosaoCPBroj];
      player.call('job_setCheckpoint', [ruta[0], ruta[1], ruta[2], 4]);
      Chat.sendInfoMessage(player, "Uspesno ste dostavili postu idite na sledeci marker!")

    }
  }
});

mp.events.add('prekiniposao', (player) => {
  const character: Character = get(player, "character");

  if (character.data.job == 1 && player.RadiPosao == true) {
    player.RadiPosao = false;
    player.PosaoCPBroj = 0;
  }
});

let postar_ruta = [
  [0.000, 0.000, 0.000],
  [0.000, 0.000, 0.000],
  [0.000, 0.000, 0.000],
  [0.000, 0.000, 0.000],
  [0.000, 0.000, 0.000],
  [0.000, 0.000, 0.000]
]

export { postar_server };