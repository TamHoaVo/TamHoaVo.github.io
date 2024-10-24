<head>
    <title>Nerdieluv</title>
    <link href="nerdieluv.css" type="text/css" rel="stylesheet" /> 
</head>
<div class="bannerarea">
    <img src="nerdluv.png" alt="banner logo" /> <br>
     where meek geeks meet 
</div>
<br>
<?php
    /* get all the signles */
    $singles = file("singles.txt");

    /* find the user and get user */
    $user = ''; /*initial empty string */
    foreach ($singles as $single){ /* iterate over each element in singles */
        if(strpos($single, $_GET["name"] . ",") === 0){ /* check if element start with a name followed by a comma */
            $user = trim($single);
            break;
        }
    }
    /* get array of each user info */
    $user_info = explode(",", $user);
    $user_gender = $user_info[1];
    $user_age = (int)$user_info[2];
    $user_personality = $user_info[3];
    $user_os = $user_info[4];
    $user_min_age = (int)$user_info[5];
    $user_max_age = (int)$user_info[6];

    /* opposite gender */
    $opposite_gender = ($user_gender === 'F') ? 'M' : 'F';

    /* put matches into an array */
    $matches = array();
?>
<div>
<?php
    /* get matches in the singles.txt file */
    $first_match = true; /*initial no match found */
    /* getting the other people info */
    foreach ($singles as $single){ /* iterates to all the singles */
        /* same user skip */
        if(trim($single) === $user) continue;
        /* getting the array for other person info */
        $other_info = explode(",", trim($single));
        $other_name = $other_info[0];
        $other_gender = $other_info[1];
        $other_age = (int)$other_info[2];
        $other_personality = $other_info[3];
        $other_os = $other_info[4];
        $other_min_age = (int)$other_info[5];
        $other_max_age = (int)$other_info[6];
        /* check gender */
        if(strcmp($opposite_gender, $other_gender) === 0){
            /*check age and os systems matching*/
            if (
                $other_min_age <= $user_age && $user_age <= $other_max_age &&
                $user_min_age <= $other_age && $other_age <= $user_max_age && strcmp($user_os, $other_os) === 0
            ) {
                /* check if at least one personality letter in common */
                if(preg_match("/[" . preg_quote($user_personality) . "]/", $other_personality) === 1){
                    $matches[] = $single;
                    if($first_match){

                ?>
                    <!--diplay name for first match-->
                    <strong>Matches for <?= htmlspecialchars($_GET["name"]) ?>:</strong><br>
                <?php
                        $first_match = false; /*first match is found */
                    }
                ?>
                <!--diplay the matches people -->
                <div class= "match">
                    <img src="user.png" alt="user"/>
                    <div>
                        <ul>
                            <li><p><?= htmlspecialchars($other_name) ?></p></li>
                            <li><strong>gender:</strong> <?= htmlspecialchars($other_gender) ?></li>
                            <li><strong>age:</strong> <?= htmlspecialchars($other_age) ?></li>
                            <li><strong>type:</strong> <?= htmlspecialchars($other_personality) ?></li>
                            <li><strong>OS:</strong> <?= htmlspecialchars($other_os) ?></li>
                        </ul>
                    </div>
                </div>
<?php
                }   
            }
        }
    }
?>
</div>
<?php
/* no matches for anyone */
    if(count($matches) === 0) {
        
?>
        <strong>Matches for <?= htmlspecialchars($_GET["name"]) ?>:</strong><br><br>
        <div>No match is found.</div>
<?php
    }
?>
<div>
    <a href="index.php">Logout</a>
</div>
