-- Query 1: Insert a new account
INSERT INTO public.account
    (account_firstname, account_lastname, account_email, account_password)
VALUES
    ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Query 2: Update account type
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Query 3: Delete account
DELETE FROM public.account
WHERE account_id = 1;

-- Query 4: Update description (example)
SELECT REPLACE(inv_description, 'small interiors', 'a huge interior')
FROM public.inventory
WHERE inv_id = 10;

-- Query 5: Join classification and inventory
SELECT cn.classification_name, inv.inv_make, inv.inv_model
FROM public.classification cn
JOIN public.inventory inv
ON cn.classification_id = inv.inv_classification_id
WHERE cn.classification_name = 'Sport';

-- Query 6: Correctly update image paths
UPDATE public.inventory
SET 
    inv_image = '/images/vehicles/' || REGEXP_REPLACE(inv_image, '^/?images/(vehicles/)?', ''),
    inv_thumbnail = '/images/vehicles/' || REGEXP_REPLACE(inv_thumbnail, '^/?images/(vehicles/)?', '')
WHERE inv_image LIKE '%images/%'
   OR inv_thumbnail LIKE '%images/%';
