//отсечение первых символов строки (нужно для выделения общей части аттрибута id)
function cutstr (source_str, first_num)
{
  var res = "";
  var i;
  var len = source_str.length;
  for (i=first_num; i<len; i+=1)
  {
    res = res + source_str.charAt(i);
  }
  return res;
}
//получение значений свойств css в целочисленном виде
function getcss_px (elem, css_name)
{
  var val =  elem.css(css_name);
  var len = val.length;
  var newval = "";
  for (i=0; i<(len-2); i+=1)
  {
    newval = newval + val.charAt(i);
  }
  return parseInt(newval);
}
//конструктор класса "элемент страницы"
function elem (elem_selector)
{
  this.ob = elem_selector;
  this.wdt = getcss_px(this.ob, "width");
  this.hgt = getcss_px(this.ob, "height");
  this.z_index = parseInt(this.ob.css("z-index"));
  this.vsbl = 1;
}
function fmenu_anim_show (obj)
{
  init_left = getcss_px(obj, "left");
  init_top = getcss_px(obj, "top");
  init_hgt = getcss_px(obj, "height");
  init_wdt = getcss_px(obj, "width");
  obj.css({"top" : (init_top-50)+"px",
           "left" : (init_left-50)+"px",
           "width" : (init_wdt-50)+"px",
           "height" : (init_hgt-20)+"px",
           "opacity" : "0.0"
         }
  );
  obj.animate({"top" : (init_top)+"px",
           "left" : (init_left)+"px",
           "width" : (init_wdt)+"px",
           "height" : (init_hgt)+"px",
           "opacity" : "1.0"
         }, 200
  );
}
function fmenu_anim_hide (obj, res_css)
{
  obj.animate({"top" : (getcss_px(obj, "top")-50)+"px",
               "left" : (getcss_px(obj, "left")-50)+"px",
               "height" : (getcss_px(obj, "height")-20)+"px",
               "width" : (getcss_px(obj, "width")-50)+"px",
               "opacity" : "0.0"
              },
    200,
    function ()
    {
      obj.hide();
      obj.css(res_css);
      obj.css({"opacity" : "1.0"});
    }
  );
}
$(document).ready(function ()
  {
    //доступ к элементам меню производится через экземпляры класса "элемент страницы"
    var fmenu = new elem($("body #page_container #floating_menu"));
    fmenu.vsbl = 0;
    var fshow = new elem(fmenu.ob.find("#show_menu"));
    var fhidden = new elem (fmenu.ob.find("#hidden_menu"));
    var fbutton = new elem (fmenu.ob.find("#order_button"));
    fbutton.vsbl = 0;
    fbutton.ob.hide();
    //доступ к выплывающим элементам через ассоциативный массив экземпляров класса
    var fblocks = new Object ();
    var indx, i;
    var flb = $("body #page_container #floating_menu .floating_block");
    var fblocks_num = flb.length;
    for (i=0; i<fblocks_num; i+=1)
    {
      indx = flb.eq(i).attr("id");
      fblocks[indx] = new elem(flb.eq(i));
      fblocks[indx].vsbl = 0;
      fblocks[indx].ob.hide();
    }
    //инициализация переменных для выплывания элементов
    var fblocks_cur_shift = fhidden.hgt;
    var fblocks_init_zindx = parseInt(flb.eq(0).css("z-index"));
    var max_zindx = fblocks_init_zindx;
    var fblocks_init_top = flb.eq(0).css("top");
    var showed_fblocks_num = 0;
    var dist = 10;
    //выплывание всего меню
    fshow.ob.click(function ()
      {
        if (fmenu.vsbl == 0)
        {
          fmenu.ob.animate({"right" : (getcss_px(fmenu.ob, "right")+fhidden.wdt)+"px"}, 300, function ()
            {
              fshow.ob.find("#show_menu_bkg #show_menu_text").html("скрыть");
            }
          );
          fmenu.vsbl = 1;
        }
        else
        {
          fmenu.ob.animate({"right" : (getcss_px(fmenu.ob, "right")-fhidden.wdt)+"px"}, 300, function ()
            {
              fshow.ob.find("#show_menu_bkg #show_menu_text").html("заказать прямо сейчас!");
            }
          );
          fmenu.vsbl = 0;
        }
      }
    );
    //выплывание соответстующего элемента ассоциативного массива
    fhidden.ob.find(".show_floating_block").click(function ()
      {
        var opened_indx = cutstr($(this).attr("id"), 5);
        if (fblocks[opened_indx].vsbl == 0)
        {
          fblocks[opened_indx].vsbl = 1;
          max_zindx += 1;
          fblocks[opened_indx].ob.css({"z-index" : max_zindx, "top" : (getcss_px(fblocks[opened_indx].ob, "top")+fblocks_cur_shift+dist)+"px"});
          fmenu_anim_show(fblocks[opened_indx].ob);
          fblocks[opened_indx].ob.show();
          fblocks[opened_indx].z_index = max_zindx;
          fblocks_cur_shift += (fblocks[opened_indx].hgt+dist);
          if (showed_fblocks_num == 0)
          {
            var fbtn_top = getcss_px(fbutton.ob, "top");
            var fbtn_hgt = fbutton.hgt;
            fbutton.ob.css({"top" : (fbtn_top+fhidden.hgt+dist)+"px", "height" : "0px"});
            setTimeout(function ()
              {
                fbutton.ob.show();
                fbutton.ob.animate({"height" : fbtn_hgt+"px"}, 200);
              }, 200);
            fbutton.vsbl = 1;
          }
          else
          {
            fbutton.ob.animate({"top" : (getcss_px(fbutton.ob, "top")+fblocks[opened_indx].hgt+dist)+"px"}, 200);
          }
          showed_fblocks_num += 1;
        }
      }
    );
    //сворачивание элемента
    fmenu.ob.find(".close_flblock").click(function ()
      {
        var closed_indx = cutstr($(this).attr("id"), 6);
        if (fblocks[closed_indx].vsbl == 1)
        {
          var closed_zindx = fblocks[closed_indx].z_index;
          var indx;
          fblocks[closed_indx].vsbl = 0;
          for (indx in fblocks)
          {
            if ((fblocks[indx].z_index > closed_zindx) && (fblocks[indx].vsbl == 1))
            {
              fblocks[indx].z_index -= 1;
              fblocks[indx].ob.animate({"z_index" : fblocks[indx].z_index, "top" : (getcss_px(fblocks[indx].ob, "top")-fblocks[closed_indx].hgt-dist)+"px"}, 200);
            }
          }
          max_zindx -= 1;
          fblocks[closed_indx].z_index = fblocks_init_zindx;
          var closed_hgt = fblocks[closed_indx].hgt;
          fmenu_anim_hide(fblocks[closed_indx].ob, {"z-index" : fblocks_init_zindx, "top" : fblocks_init_top, "left" : fblocks[closed_indx].ob.css("left"), "height" : (closed_hgt)+"px", "width" : fblocks[closed_indx].wdt+"px"});
          fblocks_cur_shift -= (fblocks[closed_indx].hgt+dist);
          if (showed_fblocks_num > 1)
          {
            fbutton.ob.animate({"top" : (getcss_px(fbutton.ob, "top")-fblocks[closed_indx].hgt-dist)+"px"}, 200);
          }
          else
          {
            var fbutton_top = getcss_px(fbutton.ob, "top");
            var fbutton_hgt = getcss_px(fbutton.ob, "height");
            fmenu_anim_hide(fbutton.ob, {"top" : (fbutton_top-fhidden.hgt-dist)+"px", "left" : fbutton.ob.css("left"), "height" : (fbutton_hgt)+"px", "width" : fbutton.ob.css("width")});
          }
          showed_fblocks_num -= 1;
        }
      }
    );
  }
);