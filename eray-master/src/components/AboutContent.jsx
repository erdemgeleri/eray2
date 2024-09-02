import React from "react";
import drawing from "../assets/rosso çizim site için.png";

const AboutContent = () => (
  <div className="hakkimda" id="hakkimda">
    <div className="resim">
      <img src={drawing} alt="Eray Kirazlı" />
    </div>
    <div className="bilgiler">
      <div className="hakkimdabilgiler">
        <h2>Merhaba Ben Eray</h2>
        <p>rossoEray CREATIVE – 2019</p>
        <p>
          Grafik tasarımcıyım. 2017 yılından bu yana bu alanda Freelance olarak
          faaliyet göstermekteyim. 2019 yılında Rosso Creative adı altında işlerimi
          yapmaya başladım. Şu anda Vizyon Reklam Ajansı ve Dijital Baskı Merkezinde
          grafik tasarımcı olarak çalışmaktayım. Kurumsal kimlik tasarımları, reklam
          ürünleri gibi ihtiyaçlarınız için benimle iletişime geçebilirsiniz.
        </p>
      </div>
      <a href="https://www.behance.net/eraykirazl" className="buton">
        Behance
      </a>
    </div>
  </div>
);

export default AboutContent;
