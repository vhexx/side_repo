$(document).ready(function ()
  {
    window.ParsleyValidator.setLocale('ru');
    $("#fquest").hide();
    $("#commit_orders_list").on("click", ".str input:button", function ()
      {
        $(this).closest(".inputs").find("input:text").val("0");
        $(this).closest(".str").hide();
      }
    );
    $("#fmenu").on("click", ".close_flblock", function ()
      {
    	$(this).closest(".floating_block").find("input:text").val("0");
      }
    );
    $(".commit_form").each(function ()
    {
      var cur_form = $(this);
      cur_form.parsley().subscribe("parsley:form:validate", function (formInstance)
        {
          var valid_fields_num = 0;
          var valid_err_num = 0;
          var order_str = "";
          var order_price = 0;
          cur_form.find("input:text").each(function ()
            {
              if ($(this).parsley().isValid())
              {
                if ( ($(this).val() != "") && ($(this).val() != "0") )
                {
                  valid_fields_num += 1;
                  order_str = order_str + "; " + $(this).closest(".order_info").find(".oname").text() + ", "
                              + $(this).closest(".order_info").find(".oprice").text() + "р."
                              + " - " + $(this).val() + "шт.";
                  order_price += parseInt($(this).closest(".order_info").find(".oprice").text())*parseInt($(this).val());
                }
                else
                {
                  $(this).val("0");
                }
              }
              else
              {
                valid_err_num += 1;
              }
            }
          );
          if ((valid_err_num > 0) || (valid_fields_num == 0))
          {
            formInstance.submitEvent.preventDefault();
            if ((valid_fields_num == 0) && (valid_err_num == 0))
            {
            	alert("Вы ничего не заказали"); 
            }
          }
          else if (cur_form.attr("id") == "fmenu_form")
          {
            formInstance.submitEvent.preventDefault();
            $("#cart, #floating_menu").hide();
            $("#page_container #fquest").show();
            $("#page_container #fquest .final_order_text").html(order_str.substr(1, (order_str.length-1)) );
            $("#page_container #fquest .final_order_price").html(order_price);
          }
        }
      );
    }
    );
  }
);