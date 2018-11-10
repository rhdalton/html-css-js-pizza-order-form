$(document).ready(function () {
    var curtab = 1;
    var tabWidth = $('#tabs .tab').width();
    var totalcost = 0;

    var orderReady = {  'size':'',
                        'crust':'',
                        'cheese':'',
                        'sauce':'',
                        'meats':[],
                        'vegis':[]
                    };
    var pizzasize = {
                    1:'Personal Pizza',
                    2:'Medium Pizza',
                    3:'Large Pizza',
                    4:'Extra Large Pizza'
                }

    var crust = {   1:'Plain Crust',
                    2:'Garlic Butter Crust',
                    3:'Spicy Crust',
                    4:'House Special Crust',
                    5:'Cheese Stuffed Crust'
                }
    var cheese = {  1:'Regular Cheese',
                    2:'Extra Cheese',
                    3:'No Cheese'
                }
    var sauce = {   1:'Marinara Sauce',
                    2:'White Sauce',
                    3:'Barbeque Sauce',
                    4:'No Sauce'
                }
    var meats = {   1:'Pepperoni',
                    2:'Sausage',
                    3:'Canadian Bacon',
                    4:'Ground Beef',
                    5:'Anchovies',
                    6:'Chicken'
                }
    var veggi = {   1:'Tomatoes',
                    2:'Onions',
                    3:'Olives',
                    4:'Green Peppers',
                    5:'Mushrooms',
                    6:'Pineapple',
                    7:'Spinach',
                    8:'Jalapenos'
                }
    /** define cost in dollars each selection */
    var costs = {
                    'size':{1:6, 2:10, 3:14, 4:16},
                    'crust':{1:0, 2:0, 3:0, 4:0, 5:3},
                    'cheese':{1:0, 2:3, 3:0},
                    'extra-toppings':1
                }

    /********************************************************
     * moveToTab(t)
     * Moves to specified tab based on value of t
     * *****************************************************/

    function moveToTab(t) {
        var lft = (t - 1) * -tabWidth
        curtab = t;
        $('#tabs-cell').animate({
            left: lft
        }, 400, function () {
        });
        
        /** make current tab active while others un-active **/
        $('#tab-header li').each(function(){
            if($(this).attr('tab') == curtab) $(this).addClass('tab-active');
            else $(this).removeClass('tab-active');
        });
    }

    /********************************************************
     * checkOrder()
     * Check to make sure required selections are made
     * before allowing the submit order button enabled
     * *****************************************************/
    function checkOrder() {
        if(orderReady['size'] != '' &&
            orderReady['crust'] != '' &&
            orderReady['cheese'] != '' &&
            orderReady['sauce'] != '')

            $('#submit-order').removeAttr('disabled');
    }

    /********************************************************
     * submitOrder()
     * Process submit order function and display Order Summary
     * *****************************************************/
    function submitOrder() {

        // add pizza size to summary list and add to total cost
        var app = '<tr><td>' + pizzasize[orderReady['size']] + '</td><td class="text-right">$' + costs['size'][orderReady['size']] + '</td></tr>';
        totalcost += costs['size'][orderReady['size']];

        // add pizza crust to summary list, if cheese stuffed, add extra $
        app += '<tr><td>' + crust[orderReady['crust']] + '</td><td class="text-right">';
        if(costs['crust'][orderReady['crust']] > 0) {
            app += '<span>+$' + costs['crust'][orderReady['crust']] + '</span>';
            totalcost += costs['crust'][orderReady['crust']];
        }
        app += '</td></tr>';

        // add pizza cheese to summary list, if extra cheese add extra $
        app += '<tr><td>' + cheese[orderReady['cheese']] + '</td><td class="text-right">';
        if(costs['cheese'][orderReady['cheese']] > 0) {
            app += '<span>+$' + costs['cheese'][orderReady['cheese']] + '</span>';
            totalcost += costs['cheese'][orderReady['cheese']];
        }
        app += '</td></tr>';

        // add pizza sauce to summary list
        app += '<tr><td>' + sauce[orderReady['sauce']] + '</td><td></td></tr>';

        app += '<tr><td>Toppings:</td><td></td></tr>';

        // if no toppings, say 'none', else continue below to add toppings to summary list
        if(orderReady['meats'].length == 0 &&
            orderReady['vegis'].length == 0) {
                
            app += '<tr><td><div>None</div></td><td></td></tr>';

        }
        else {

            // add pizza meats to summary list, if more than 1 meat, add $ for each above 1
            for(var i = 0; i < orderReady['meats'].length; i++) {
                app += '<tr><td><div>' + meats[orderReady['meats'][i]] + '</div></td><td class="text-right">'
                if(i > 0) {
                    app += '<span>+$' + costs['extra-toppings'] + '</span>';
                    totalcost += costs['extra-toppings'];
                }
                app += '</td></tr>';
            }

            // add pizza veggis to summary list, if more than 1 veggi, add $ for each above 1
            for(var i = 0; i < orderReady['vegis'].length; i++) {
                app += '<tr><td><div>' + veggi[orderReady['vegis'][i]] + '</div></td><td class="text-right">';
                if(i > 0) {
                    app += '<span>+$' + costs['extra-toppings'] + '</span>';
                    totalcost += costs['extra-toppings'];
                }
                app += '</td></tr>';
            }
        }

        // add total cost to summary list
        app += '<tr><td class="tc font-weight-bold">Total Price:</td>df<td class="tc text-right font-weight-bold">$' + totalcost + '</td></tr></table>';
        
        
        // display summary list
        $('#order-sum').append(app);
        $('#wrapper').html($('#order-result'));
        $('#order-result').show();
    }

    /** 
     * Enable onclick actions for submitting order 
    **/
    $('#submit-order').click(function () {
        submitOrder();
    });

    /** 
     * Enable onclick actions for section tabs 
    **/
    $('#tab-header li a').click(function () {
        moveToTab($(this).parent().attr('tab'));
        return false;
    });

    /*******************************************************
    * TODO: Refactor a lot of this onclick events below
    */

    /** 
     * Enable onclick actions for pizza size options 
    **/
    $('input[name="pizzasize"]').click(function(){
        $('input[name="pizzasize"]').each(function(){
            if($(this).is(':checked')) {
                $(this).parent().addClass('sel');
            } else {
                $(this).parent().removeClass('sel');
            }
        });
        $('#o-size').html('<strong>Size:</strong> &nbsp;'+pizzasize[$(this).val()]);
        orderReady['size'] = $(this).val();
        checkOrder();
    });
    
    /** 
     * Enable onclick actions for pizza crust options 
    **/
    $('input[name="pizzacrust"]').click(function(){
        $('input[name="pizzacrust"]').each(function(){
            if($(this).is(':checked')) {
                $(this).parent().addClass('sel');
            } else {
                $(this).parent().removeClass('sel');
            }
        });
        $('#o-crust').html('<strong>Crust:</strong> &nbsp;'+crust[$(this).val()]);
        orderReady['crust'] = $(this).val();
        checkOrder();
    });
    
    /** 
     * Enable onclick actions for pizza cheese options 
    **/
    $('input[name="pizzacheese"]').click(function(){
        $('input[name="pizzacheese"]').each(function(){
            if($(this).is(':checked')) {
                $(this).parent().addClass('sel');
            } else {
                $(this).parent().removeClass('sel');
            }
        });
        $('#o-cheese').html('<strong>Cheese:</strong> &nbsp;'+cheese[$(this).val()]);
        orderReady['cheese'] = $(this).val();
        checkOrder();
    });

    /** 
     * Enable onclick actions for pizza sauce options 
    **/
    $('input[name="pizzasauce"]').click(function(){
        $('input[name="pizzasauce"]').each(function(){
            if($(this).is(':checked')) {
                $(this).parent().addClass('sel');
            } else {
                $(this).parent().removeClass('sel');
            }
        });
        $('#o-sauce').html('<strong>Sauce:</strong> &nbsp;'+sauce[$(this).val()]);
        orderReady['sauce'] = $(this).val();
        checkOrder();
    });

    /** 
     * Enable onclick actions for pizza meat options 
    **/
    $('input[name="pizzameat"]').click(function(){
        if($(this).is(':checked')) {
            $(this).parent().addClass('sel');
            $('#o-top').append('<li id="om'+$(this).val()+'">'+meats[$(this).val()]+'</li>');
            orderReady['meats'].push($(this).val());
        } else {
            $(this).parent().removeClass('sel');
            $('#om'+$(this).val()).remove();
            var remove = orderReady['meats'].indexOf($(this).val());
            if (remove !== -1) orderReady['meats'].splice(remove, 1);
        }
        showToppings();
    });

    /** 
     * Enable onclick actions for pizza veggi options 
    **/
    $('input[name="pizzaveg"]').click(function(){
        if($(this).is(':checked')) {
            $(this).parent().addClass('sel');
            $('#o-top').append('<li id="ov'+$(this).val()+'">'+veggi[$(this).val()]+'</li>');
            orderReady['vegis'].push($(this).val());
        } else {
            $(this).parent().removeClass('sel');
            $('#ov'+$(this).val()).remove();
            var remove = orderReady['vegis'].indexOf($(this).val());
            if (remove !== -1) orderReady['vegis'].splice(remove, 1);
        }
        showToppings();
    });

    /********************************************************
     * showToppings()
     * Check if meats array or vegis array has items, if yes
     * show the 'Toppings' header, if not, hide it.
     * *****************************************************/
    function showToppings() {
        if(orderReady['meats'].length > 0 || orderReady['vegis'].length > 0) $('.top-title').css('display','inline-block');
        else $('.top-title').hide();
    }
});