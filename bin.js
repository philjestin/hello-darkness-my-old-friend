#!/usr/bin/env node

var path = require("path");
var childProcess = require("child_process");

var FILENAME = path.join(__dirname, "theme.mp3");

var bin = "play";
var args = [FILENAME];

if (process.platform == "darwin") bin = "afplay";
if (process.platform == "win32") {
  bin = "powershell";
  args = [
    "-c",
    "Add-Type -AssemblyName PresentationCore; " +
      "$MediaPlayer = New-Object System.Windows.Media.Mediaplayer; " +
      '$MediaPlayer.Open("' +
      FILENAME +
      '"); ' +
      "$MediaPlayer.Play(); " +
      "Start-Sleep 273",
  ];
}

if (has("mplayer")) {
  bin = "mplayer";
  args = ["-really-quiet", FILENAME];
}

var proc;
var respawn = true;

play();

function play() {
  if (!respawn) return;

  proc = childProcess.spawn(bin, args);
  proc.stdout.resume();
  proc.stderr.resume();
  proc.unref();
  proc.on("exit", play);

  if (process.argv[2]) {
    proc.stdout.unref();
    proc.stderr.unref();
    proc.stdin.unref();
  }
}

function has(cmd) {
  try {
    childProcess.execSync("which " + cmd + " 2>/dev/null 2>/dev/null");
    return true;
  } catch (err) {
    return false;
  }
}

if (process.argv[2]) {
  childProcess.spawn(process.argv[2], process.argv.slice(3), {
    stdio: "inherit",
  });
} else {
  inspire();
}

process.on("exit", function () {
  respawn = false;
  proc.kill();
});

function inspire() {
  const visualEffect = 
  `
                               ...----....
                           ..-:"''         ''"-..
                        .-'                      '-.
                      .'              .     .       '.
                    .'   .          .    .      .    .''.
                  .'  .    .       .   .   .     .   . ..:.
                .' .   . .  .       .   .   ..  .   . ....::.
               ..   .   .      .  .    .     .  ..  . ....:IA.
              .:  .   .    .    .  .  .    .. .  .. .. ....:IA.
             .: .   .   ..   .    .     . . .. . ... ....:.:VHA.
             '..  .  .. .   .       .  . .. . .. . .....:.::IHHB.
            .:. .  . .  . .   .  .  . . . ...:.:... .......:HIHMM.
           .:.... .   . ."::"'.. .   .  . .:.:.:II;,. .. ..:IHIMMA
           ':.:..  ..::IHHHHHI::. . .  ...:.::::.,,,. . ....VIMMHM
          .:::I. .AHHHHHHHHHHAI::. .:...,:IIHHHHHHMMMHHL:. . VMMMM
         .:.:V.:IVHHHHHHHMHMHHH::..:" .:HIHHHHHHHHHHHHHMHHA. .VMMM.
         :..V.:IVHHHHHMMHHHHHHHB... . .:VPHHMHHHMMHHHHHHHHHAI.:VMMI
         ::V..:VIHHHHHHMMMHHHHHH. .   .I":IIMHHMMHHHHHHHHHHHAPI:WMM
         ::". .:.HHHHHHHHMMHHHHHI.  . .:..I:MHMMHHHHHHHHHMHV:':H:WM
         :: . :.::IIHHHHHHMMHHHHV  .ABA.:.:IMHMHMMMHMHHHHV:'. .IHWW
         '.  ..:..:.:IHHHHHMMHV" .AVMHMA.:.'VHMMMMHHHHHV:' .  :IHWV
          :.  .:...:".:.:TPP"   .AVMMHMMA.:. "VMMHHHP.:... .. :IVAI
         .:.   '... .:"'   .   ..HMMMHMMMA::. ."VHHI:::....  .:IHW'
         ...  .  . ..:IIPPIH: ..HMMMI.MMMV:I:.  .:ILLH:.. ...:I:IM
       : .   .'"' .:.V". .. .  :HMMM:IMMMI::I. ..:HHIIPPHI::'.P:HM.
       :.  .  .  .. ..:.. .    :AMMM IMMMM..:...:IV":T::I::.".:IHIMA
       'V:.. .. . .. .  .  .   'VMMV..VMMV :....:V:.:..:....::IHHHMH
         "IHH:.II:.. .:. .  . . . " :HB"" . . ..PI:.::.:::..:IHHMMV"
          :IP""HHII:.  .  .    . . .'V:. . . ..:IH:.:.::IHIHHMMMMM"
          :V:. VIMA:I..  .     .  . .. . .  .:.I:I:..:IHHHHMMHHMMM
          :"VI:.VWMA::. .:      .   .. .:. ..:.I::.:IVHHHMMMHMMMMI
          :."VIIHHMMA:.  .   .   .:  .:.. . .:.II:I:AMMMMMMHMMMMMI
          :..VIHIHMMMI...::.,:.,:!"I:!"I!"I!"V:AI:VAMMMMMMHMMMMMM'
          ':.:HIHIMHHA:"!!"I.:AXXXVVXXXXXXXA:."HPHIMMMMHHMHMMMMMV
            V:H:I:MA:W'I :AXXXIXII:IIIISSSSSSXXA.I.VMMMHMHMMMMMM
              'I::IVA ASSSSXSSSSBBSBMBSSSSSSBBMMMBS.VVMMHIMM'"'
               I:: VPAIMSSSSSSSSSBSSSMMBSSSBBMMMMXXI:MMHIMMI
              .I::. "H:XIIXBBMMMMMMMMMMMMMMMMMBXIXXMMPHIIMM'
              :::I.  ':XSSXXIIIIXSSBMBSSXXXIIIXXSMMAMI:.IMM
              :::I:.  .VSSSSSISISISSSBII:ISSSSBMMB:MI:..:MM
              ::.I:.  ':"SSSSSSSISISSXIIXSSSSBMMB:AHI:..MMM.
              ::.I:. . ..:"BBSSSSSSSSSSSSBBBMMMB:AHHI::.HMMI
              :..::.  . ..::":BBBBBSSBBBMMMB:MMMMHHII::IHHMI
              ':.I:... ....:IHHHHHMMMMMMMMMMMMMMMHHIIIIHMMV"
                "V:. ..:...:.IHHHMMMMMMMMMMMMMMMMHHHMHHMHP'
                 ':. .:::.:.::III::IHHHHMMMMMHMHMMHHHHM"
                   "::....::.:::..:..::IIIIIHHHHMMMHHMV"
                     "::.::.. .. .  ...:::IIHHMMMMHMV"
                       "V::... . .I::IHHMMV"'
                         '"VHVHHHAHHHHMMV:"'
  `;
  setTimeout(() => {
    visualEffect.split("\n").forEach((line, index) => {
      setTimeout(()=>{console.log(line)}, index*666);
    });
  },3500);
}