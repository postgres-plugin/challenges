select * from challenges
JOIN
tags_challenges
on
tags_challenges.challenges_id = challenges.id
JOIN
tags
on
tags_challenges.tags_id = tags.id
where
challenges.active = true
and tags.active = true; 
