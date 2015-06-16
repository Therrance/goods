$(document).ready(function(){
    function Goods(){
        var self = this, id = 0, arrIDs = [], isCheckedAll = true;

        this.init = function(){
            $('#goods').on('keypress', function(event){
                if(event.keyCode == 13){
                    self.addGoods($(this).val());
                    $(this).val('');
                }
            });

            $('ul').delegate('li', 'mouseenter', function(){
                $('.destroy', this).addClass('active');

                $(this).delegate('.destroy', 'click', function(){
                    $(this).closest('li').remove();
                }).delegate('label', 'dblclick', function(event){
                    var inputEdit = $('input[type=text]', this),
                        oldValue = inputEdit.val();

                    inputEdit.removeAttr('readonly').on('keyup', function(event){
                        console.log(event.keyCode);
                        if(event.keyCode == 27){
                            $(this).val(oldValue).trigger('blur');
                        } else if(event.keyCode == 13){
                            $(this).trigger('blur');
                        }
                    });
                }).delegate('input[type=checkbox]', 'change', function(){
                    var parentID = $(this).closest('li').attr('id');
                    if($(this).prop("checked")){
                        $(this).parent().addClass('active');
                        arrIDs.push(parentID);
                    } else {
                        $(this).parent().removeClass('active');
                        var positionNum = arrIDs.indexOf(parentID);
                        arrIDs.splice(positionNum, 1);
                    }
                });
            }).delegate('li', 'mouseleave', function(){
                $('.destroy', this).removeClass('active');
            });

            $('#checkAllBtn').on('click', function(){
                var list = $('li');
                if(isCheckedAll){
                    for(var i in list){
                        if(!!list[i].id){
                            arrIDs.push(list[i].id);
                            $('#' + list[i].id + ' input[type=checkbox]').prop("checked", true).parent().addClass('active');
                        }
                    }
                } else {
                    arrIDs = [];
                    $('li input[type=checkbox]').prop("checked", false).parent().removeClass('active');
                }
                isCheckedAll = !isCheckedAll;
            });

            $('#clearBtn').on('click', function(){
                self.removeGoods();
            });
        };

        var getID = function(){
            return id++;
        };

        this.addGoods = function(value){
            $('ul').append('<li id="goods'+getID()+'">' +
            '<div class="checkbox">' +
                '<label> ' +
                    '<input type="checkbox"/>' +
                    '<input type="text" value="'+value+'" readonly/>' +
                '</label>' +
            '<button class="destroy">X</button>' +
            '</div></li>');
        };

        this.removeGoods = function(){
            for(var i in arrIDs){
                $('#'+arrIDs[i]).remove();
            }
        }
    }

    var goods = new Goods();
    goods.init();

});