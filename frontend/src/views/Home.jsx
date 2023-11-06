import { useContext } from "react";
import { getTranslation, getLang } from "@/plugins/i18n";
import StoreContext from "@/plugins/store";
import CoreLayout from "@/components/core/Layout";

const Content = () => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);
  const { sidebarOpen, setStoreSidebarOpen } = useContext(StoreContext);

  return (
    <div style={{ padding: "32px" }}>
      <h1>{t("Home")}</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quis urna sed mollis. Fusce lobortis feugiat tellus eget elementum. Proin sagittis ullamcorper ipsum non tincidunt. Vivamus et risus turpis. Curabitur hendrerit nisl quis neque sodales ultricies. Morbi lacinia elit facilisis mauris volutpat malesuada. Nulla sit amet dictum turpis. Nunc urna ante, hendrerit eget eros non, commodo facilisis tellus. Nulla facilisis auctor augue id pretium. Quisque consectetur ipsum purus, eget ultrices nunc ornare in.<br /><br />

        <div>
          <button type="button" onClick={() => { setStoreSidebarOpen(!sidebarOpen) }}>Mon bouton</button>
        </div><br />

        Liliput id lacus ex. Duis id lacinia massa. Integer et nibh et felis ultrices consectetur. Nunc non nunc porta, posuere risus non, maximus purus. Vivamus malesuada consequat erat, eget mollis sem finibus in. Cras tempus pulvinar porttitor. Aenean ornare ornare dolor, non suscipit quam porttitor at. Fusce et pharetra ipsum. Morbi condimentum tempus odio, nec ultricies magna pharetra ac. Nullam lobortis mi ac erat sollicitudin iaculis. Cras laoreet pellentesque neque at posuere. Nullam in facilisis lectus. Nam congue sapien a ante placerat, nec vulputate nulla facilisis. Proin ut turpis quis justo lacinia tincidunt. Donec et justo odio. Nullam ornare erat vitae porta vulputate.<br /><br />

        <div>
          <div>{ sidebarOpen }</div>
        </div><br />

        Integer id lacus ex. Duis id lacinia massa. Integer et nibh et felis ultrices consectetur. Nunc non nunc porta, posuere risus non, maximus purus. Vivamus malesuada consequat erat, eget mollis sem finibus in. Cras tempus pulvinar porttitor. Aenean ornare ornare dolor, non suscipit quam porttitor at. Fusce et pharetra ipsum. Morbi condimentum tempus odio, nec ultricies magna pharetra ac. Nullam lobortis mi ac erat sollicitudin iaculis. Cras laoreet pellentesque neque at posuere. Nullam in facilisis lectus. Nam congue sapien a ante placerat, nec vulputate nulla facilisis. Proin ut turpis quis justo lacinia tincidunt. Donec et justo odio. Nullam ornare erat vitae porta vulputate.<br /><br />

        Praesent dignissim nulla ipsum, nec feugiat nisl egestas a. Pellentesque consectetur tortor nunc, vel egestas dui blandit in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean laoreet nec elit elementum congue. Ut ullamcorper tellus eget elit vestibulum, in elementum lorem condimentum. Donec at metus eros. Phasellus non rutrum lectus. Donec pharetra enim id vestibulum mollis. Mauris sodales vel quam id mollis. Donec non nibh a tortor blandit tristique at ut eros. Maecenas venenatis dui et urna maximus auctor. Etiam libero sapien, lacinia et arcu et, pellentesque lobortis sapien. Pellentesque nibh enim, ultricies nec lectus nec, molestie congue odio. Phasellus vestibulum molestie nisi, non pharetra odio tincidunt eu. Sed sodales felis sed eros porttitor ullamcorper.<br /><br />

        Sed sit amet odio varius, feugiat neque non, aliquet felis. Vestibulum elementum tristique sagittis. Quisque fringilla iaculis condimentum. Sed eget purus id nibh bibendum ultricies id et urna. Vivamus tincidunt in neque vitae vehicula. Nunc et diam vitae nunc fermentum varius ut ac sem. Integer rhoncus non sem nec viverra. Aenean nibh diam, pulvinar et lectus tempor, varius aliquet leo. Phasellus id bibendum nunc. Etiam quis feugiat enim. Sed mauris urna, venenatis non augue non, mollis molestie tortor. Curabitur ac eros in eros iaculis porttitor at at neque. Etiam egestas ipsum libero, ut consequat arcu fermentum non.<br /><br />

        Aenean blandit tortor quis libero posuere, sit amet aliquet odio elementum. Sed nisl felis, tempor ultrices quam non, accumsan fermentum est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur accumsan ex sit amet justo tincidunt, ut commodo arcu finibus. Aliquam egestas placerat scelerisque. Phasellus non ipsum elit. In sodales nec metus nec tincidunt. Suspendisse facilisis vehicula metus vitae volutpat. Sed porta semper tristique.<br /><br />

        Cras urna leo, sagittis a porttitor ullamcorper, interdum bibendum nibh. Aliquam vitae ipsum ut magna aliquet laoreet. Vivamus pellentesque leo lectus, ac dignissim quam laoreet id. Cras pulvinar nisi finibus velit faucibus, et lobortis magna finibus. Aliquam aliquet et lorem id placerat. In rutrum semper ipsum. In viverra magna id tempor porta. Pellentesque vitae leo non lorem condimentum vehicula vel quis lacus. Integer scelerisque, leo eget cursus molestie, elit turpis interdum augue, porta egestas magna ante at nisl. Sed nibh diam, pulvinar et lacus vitae, sodales ultricies ipsum. Nulla hendrerit hendrerit odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.<br /><br />

        Donec eget justo non dolor efficitur ullamcorper quis nec diam. Phasellus lacinia nec lacus non pharetra. Vivamus sodales enim ac eros dignissim, at faucibus ex tempus. Pellentesque eu mauris suscipit, cursus eros vitae, dictum turpis. Proin nec pellentesque tortor, malesuada imperdiet tellus. Integer ante diam, fringilla et gravida et, semper sit amet nibh. Nam non rhoncus ipsum.<br /><br />

        Curabitur facilisis ante a augue ornare, id pellentesque leo placerat. Pellentesque molestie urna libero, tempus imperdiet nibh pellentesque et. Mauris eget sollicitudin mauris. Praesent aliquet, neque a suscipit aliquam, turpis turpis aliquet eros, vitae imperdiet risus tortor a risus. Sed consequat faucibus rutrum. Morbi ornare faucibus augue, eu suscipit tortor volutpat id. Vestibulum sed rutrum nunc. Fusce mattis sem a commodo molestie. Quisque convallis tempor interdum. Suspendisse quis nunc sit amet sem tempor semper. Nam non tristique lectus. Aenean auctor nibh dui, non fringilla lectus tempus tincidunt.<br /><br />

        Proin porta diam vitae malesuada blandit. Pellentesque ullamcorper velit augue, vel commodo orci elementum eget. Integer in quam sed enim rutrum porttitor quis a sem. Curabitur rhoncus risus vitae neque auctor porttitor. Duis dictum diam quis pretium blandit. Suspendisse potenti. Maecenas pharetra nulla id dictum dictum. Sed porta sapien in consequat feugiat. Phasellus suscipit, massa id efficitur tincidunt, velit arcu gravida nisi, ac suscipit ligula nunc id tellus. Morbi commodo justo in felis pharetra, sit amet maximus velit rutrum. Vestibulum laoreet tristique dui, nec tincidunt diam condimentum in. Cras ut eros volutpat, sodales nunc eu, rhoncus elit. Fusce lobortis, urna id dictum laoreet, nunc tellus viverra est, in efficitur dui metus commodo eros. Mauris in placerat tellus. Nullam ullamcorper aliquet odio, et ornare purus vulputate convallis.<br /><br />

        Integer tincidunt vehicula feugiat. Sed pellentesque quam a nulla faucibus porttitor. Aenean nec odio viverra, ornare metus eu, bibendum sapien. Quisque fermentum libero sit amet velit pretium tempus. Sed semper urna gravida metus porttitor, quis bibendum augue bibendum. Donec vel urna id elit tincidunt tempus id at urna. Sed volutpat nisl enim, vel lobortis mauris congue vitae. Vivamus vitae elit sollicitudin, iaculis vitae, vehicula libero.<br /><br />

        Cras maximus, ex quis mattis placerat, justo quam venenatis sapien, sed sodales sapien diam nec eros. Morbi elementum aliquam tincidunt. Cras dignissim, metus a condimentum pretium, odio lacus aliquam tortor, ac viverra libero lectus id tortor. Sed eget massa tortor. Nulla facilisi. Sed ac magna ac quam scelerisque tristique. Pellentesque tristique, est ut porttitor tincidunt, massa lacus bibendum leo, vitae consectetur ante nibh non ligula. Nulla scelerisque, felis vitae volutpat consequat, arcu velit congue ipsum, a vehicula tellus nisl non odio. Vestibulum sagittis, nisi et volutpat commodo, leo sapien tempus diam, eget fermentum augue neque eget ex. Maecenas ullamcorper aliquam odio, quis vehicula ante. Aenean ultrices ipsum ipsum, et ultrices odio bibendum eu. Nam scelerisque augue sit amet mauris condimentum imperdiet. Donec posuere urna id tempus elementum. Duis aliquam nisl sit amet consequat porttitor. Duis congue velit in justo luctus posuere.<br /><br />

        Fusce dignissim at metus vitae pulvinar. Phasellus imperdiet semper mauris et rhoncus. Ut rhoncus est risus, ac semper lorem pellentesque in. Aenean vitae viverra lorem, sed mollis justo. Nam sed sapien auctor nunc suscipit laoreet. Mauris at venenatis lacus. Vivamus efficitur in nisl in scelerisque. Vivamus quis odio id urna porta hendrerit ac et arcu. Quisque leo est, gravida a lobortis eu, convallis nec orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque scelerisque lacus et ante scelerisque fermentum. Donec imperdiet tincidunt mattis. Suspendisse hendrerit scelerisque tortor bibendum pulvinar. In hac habitasse platea dictumst. Curabitur aliquet pellentesque mi nec posuere.<br /><br />

        Vestibulum odio tellus, rutrum ut fringilla sit amet, scelerisque non lorem. Cras enim neque, tincidunt id rutrum eget, maximus non nibh. Duis nec vehicula arcu. Fusce eu sapien ante. Donec id tortor semper, iaculis dolor in, scelerisque elit. Morbi scelerisque orci ac varius viverra. Fusce gravida, ante at eleifend accumsan, risus augue ornare nulla, ac vulputate diam ipsum id erat. Nullam id mauris enim. Mauris consequat risus id mi vestibulum mollis.<br /><br />

        In cursus magna sed sollicitudin rhoncus. Cras dolor arcu, cursus vel augue id, pulvinar elementum odio. Ut non ex eros. Nam vel blandit neque. Sed faucibus diam massa, id pellentesque nisi accumsan rhoncus. Morbi accumsan at neque id hendrerit. Quisque finibus sapien pellentesque massa consequat maximus. Sed congue dolor est, a aliquet nibh finibus at. Sed ornare elit vel nisl aliquet posuere. Integer mollis lacinia metus sed interdum. Ut tellus est, sodales vitae aliquet vel, accumsan vitae urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id gravida dolor.<br /><br />

        Aliquam erat volutpat. Cras eget eros eget purus cursus rutrum. Nunc semper est dui, non facilisis tellus laoreet quis. Nullam non porttitor tellus. Vivamus ut euismod diam. In vestibulum augue id diam ornare, sed viverra odio interdum. Donec dui turpis, ultricies id pulvinar quis, ultrices sit amet mauris.<br /><br />

        Nulla facilisi. Etiam vel lacus sapien. Sed feugiat purus eu scelerisque accumsan. Praesent at leo id augue egestas vulputate. Suspendisse potenti. Vivamus lacinia bibendum augue sit amet dignissim. Aenean dapibus finibus nisi quis blandit. Ut odio nulla, congue sit amet efficitur eu, consequat non odio. Cras viverra, dui at sagittis aliquet, sapien massa dapibus lorem, sit amet laoreet felis elit a mauris.<br /><br />

        Sed fermentum turpis quis auctor egestas. Sed eros velit, sagittis sodales molestie sit amet, facilisis in mi. Vestibulum nec volutpat mauris. Maecenas ut posuere risus, sit amet lobortis orci. Fusce ac augue ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis mollis ornare felis vel semper. Donec ullamcorper lorem sit amet lectus eleifend efficitur. Phasellus eget volutpat dui. Nam ac faucibus tellus, non commodo ligula. Praesent laoreet pharetra consequat. Nam urna metus, iaculis eu metus non, ullamcorper tincidunt justo.
      </div>
    </div>
  )
};

const HomeView = () => {
  return (
    <CoreLayout>
      <Content />
    </CoreLayout>
  )
};

export default HomeView;
