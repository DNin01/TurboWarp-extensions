// Name: System Text to Speech
// ID: dninstts
// Description: Make your projects talk, even without an internet connection.
// By: D-ScratchNinja <https://scratch.mit.edu/users/D-ScratchNinja/>
// License: MIT

(function (Scratch) {
  "use strict";

  const languages = [
    // Imported from scratch-l10n/src/supported-locales.js
    { value: "ab", text: "Аҧсшәа" },
    { value: "af", text: "Afrikaans" },
    { value: "ar", text: "العربية" },
    { value: "am", text: "አማርኛ" },
    { value: "an", text: "Aragonés" },
    { value: "ast", text: "Asturianu" },
    { value: "az", text: "Azeri" },
    { value: "id", text: "Bahasa Indonesia" },
    { value: "bn", text: "বাংলা" },
    { value: "be", text: "Беларуская" },
    { value: "bg", text: "Български" },
    { value: "ca", text: "Català" },
    { value: "cs", text: "Česky" },
    { value: "cy", text: "Cymraeg" },
    { value: "da", text: "Dansk" },
    { value: "de", text: "Deutsch" },
    { value: "et", text: "Eesti" },
    { value: "el", text: "Ελληνικά" },
    { value: "en", text: "English" },
    { value: "es", text: "Español (España)" },
    { value: "es-419", text: "Español Latinoamericano" },
    { value: "eo", text: "Esperanto" },
    { value: "eu", text: "Euskara" },
    { value: "fa", text: "فارسی" },
    { value: "fil", text: "Filipino" },
    { value: "fr", text: "Français" },
    { value: "fy", text: "Frysk" },
    { value: "ga", text: "Gaeilge" },
    { value: "gd", text: "Gàidhlig" },
    { value: "gl", text: "Galego" },
    { value: "ko", text: "한국어" },
    { value: "ha", text: "Hausa" },
    { value: "hy", text: "Հայերեն" },
    { value: "he", text: "עִבְרִית" },
    { value: "hi", text: "हिंदी" },
    { value: "hr", text: "Hrvatski" },
    { value: "xh", text: "isiXhosa" },
    { value: "zu", text: "isiZulu" },
    { value: "is", text: "Íslenska" },
    { value: "it", text: "Italiano" },
    { value: "ka", text: "ქართული ენა" },
    { value: "kk", text: "қазақша" },
    { value: "qu", text: "Kichwa" },
    { value: "sw", text: "Kiswahili" },
    { value: "ht", text: "Kreyòl ayisyen" },
    { value: "ku", text: "Kurdî" },
    { value: "ckb", text: "کوردیی ناوەندی" },
    { value: "lv", text: "Latviešu" },
    { value: "lt", text: "Lietuvių" },
    { value: "hu", text: "Magyar" },
    { value: "mi", text: "Māori" },
    { value: "mn", text: "Монгол хэл" },
    { value: "nl", text: "Nederlands" },
    { value: "ja", text: "日本語" },
    { value: "ja-Hira", text: "にほんご" },
    { value: "nb", text: "Norsk Bokmål" },
    { value: "nn", text: "Norsk Nynorsk" },
    { value: "oc", text: "Occitan" },
    { value: "or", text: "ଓଡ଼ିଆ" },
    { value: "uz", text: "Oʻzbekcha" },
    { value: "th", text: "ไทย" },
    { value: "km", text: "ភាសាខ្មែរ" },
    { value: "pl", text: "Polski" },
    { value: "pt", text: "Português" },
    { value: "pt-br", text: "Português Brasileiro" },
    { value: "rap", text: "Rapa Nui" },
    { value: "ro", text: "Română" },
    { value: "ru", text: "Русский" },
    { value: "nso", text: "Sepedi" },
    { value: "tn", text: "Setswana" },
    { value: "sk", text: "Slovenčina" },
    { value: "sl", text: "Slovenščina" },
    { value: "sr", text: "Српски" },
    { value: "fi", text: "Suomi" },
    { value: "sv", text: "Svenska" },
    { value: "vi", text: "Tiếng Việt" },
    { value: "tr", text: "Türkçe" },
    { value: "uk", text: "Українська" },
    { value: "zh-cn", text: "简体中文" },
    { value: "zh-tw", text: "繁體中文" },
  ];

  class SystemSynthExtension {
    constructor() {
      this.speechVol = 1;
      this.speechRate = 1;
      this.speechPitch = 1;
      this.speechLang = "";

      if (Scratch.extensions.unsandboxed) {
        // This is the only thing that doesn't work in the sandbox
        Scratch.vm.runtime.on("PROJECT_STOP_ALL", () =>
          speechSynthesis.cancel(),
        );
      }
    }

    userLanguage() {
      const fullLanguage = navigator.language;
      // Find exact match
      if (languages.find((i) => i.value === fullLanguage)) {
        return fullLanguage;
      }
      // Find basic match
      const match = languages.find((i) => fullLanguage.startsWith(i.value));
      if (match) {
        return match.value;
      }
      // Fall back to English
      return "en";
    }

    getInfo() {
      return {
        id: "dninstts",
        name: Scratch.translate("System Text to Speech"),
        blocks: [
          {
            opcode: "speak",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("speak [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello!"),
              },
            },
          },
          {
            opcode: "stop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop speaking"),
          },
          "---",
          {
            opcode: "setLang",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set voice language to [lang]"),
            arguments: {
              lang: {
                type: Scratch.ArgumentType.STRING,
                menu: "lang",
                defaultValue: this.userLanguage(),
              },
            },
          },
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set voice volume to [volume] %"),
            arguments: {
              volume: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "setRate",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set speaking rate to [rate] %"),
            arguments: {
              rate: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "setPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set voice pitch to [pitch] %"),
            arguments: {
              pitch: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
        ],
        menus: {
          lang: {
            acceptReporters: true,
            items: languages,
          },
        },
      };
    }

    async speak({ text }) {
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.speechLang;
      utterance.volume = this.speechVol;
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch;
      speechSynthesis.speak(utterance);

      // Make the code wait for the utterance to end
      return new Promise((resolve) => {
        const onEnd = () => {
          // Remove event listeners after use to prevent a memory leak
          utterance.removeEventListener("end", onEnd);
          utterance.removeEventListener("error", onEnd);
          resolve();
        };
        utterance.addEventListener("end", onEnd);
        utterance.addEventListener("error", onEnd);
      });
    }

    stop() {
      speechSynthesis.cancel();
    }

    setVolume({ volume }) {
      this.speechVol = Math.min(volume / 100, 1);
    }

    setRate({ rate }) {
      this.speechRate = rate / 100;
    }

    setPitch({ pitch }) {
      this.speechPitch = pitch / 100;
    }

    setLang({ lang }) {
      this.speechLang = lang;
    }
  }

  Scratch.extensions.register(new SystemSynthExtension());
})(Scratch);
